package com.devsuperior.dscatalog.service;

import java.net.URL;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.devsuperior.dscatalog.dto.CategoriaDTO;
import com.devsuperior.dscatalog.dto.ProdutoDTO;
import com.devsuperior.dscatalog.dto.UriDTO;
import com.devsuperior.dscatalog.model.Categoria;
import com.devsuperior.dscatalog.model.Produto;
import com.devsuperior.dscatalog.repository.CategoriaRepository;
import com.devsuperior.dscatalog.repository.ProdutoRepository;
import com.devsuperior.dscatalog.service.exception.DataIntegrityException;
import com.devsuperior.dscatalog.service.exception.ObjectNotFoundException;

@Service
public class ProdutoService {

	@Autowired
	private ProdutoRepository produtoRepository;
	
	@Autowired
	private CategoriaRepository categoriaRepository;
	
	@Autowired
	private S3Service s3Service;
	
	@Transactional(readOnly = true)
	public Page<ProdutoDTO> buscarTodosComPaginacao(Long idCategoria, String nome, PageRequest pageRequest) {
		List<Categoria> categorias = (idCategoria == 0) ? null : Arrays.asList(categoriaRepository.getOne(idCategoria));
		
		Page<Produto> page = produtoRepository.buscarComCategoria(categorias, nome.trim(), pageRequest);
		produtoRepository.find(page.toList());
		
		return page.map(produto -> new ProdutoDTO(produto, produto.getCategorias()));
	}

	@Transactional(readOnly = true)
	public ProdutoDTO buscarPorId(Long id) {
		Optional<Produto> opt = produtoRepository.findById(id);
		
		Produto produto = opt.orElseThrow(() -> new ObjectNotFoundException("Recurso Buscado: " + id + ", "
											  + "Objeto Não Localizado: " + Produto.class.getSimpleName()));
		
		return new ProdutoDTO(produto, produto.getCategorias());
	}

	@Transactional
	public ProdutoDTO salvar(ProdutoDTO dto) {
		Produto produto = new Produto();
		converterDeDTO(dto, produto);
		
		//solucao provisoria para salvar produtos sem categorias no front-end
		if(produto.getCategorias().size() == 0) {
			Categoria categoria  = categoriaRepository.getOne(1L);
			produto.getCategorias().add(categoria);
		}
		
		produto = produtoRepository.save(produto);

		return new ProdutoDTO(produto);
	}

	@Transactional
	public ProdutoDTO atualizar(Long id, ProdutoDTO dto) {
		try {
			Produto produto = produtoRepository.getOne(id);
			converterDeDTO(dto, produto);

			produto = produtoRepository.save(produto);
			
			return new ProdutoDTO(produto);
			
		} catch (EntityNotFoundException e) {
			throw new ObjectNotFoundException("Id Não Encontrado: " + id);
		}
	}

	public void apagar(Long id) {
		try {
			produtoRepository.deleteById(id);
		
		} catch(EmptyResultDataAccessException e) {
			throw new ObjectNotFoundException("Id Número: " + id);
		
		} catch(DataIntegrityViolationException e) {
			throw new DataIntegrityException("Erro ao excluir o produto.");
		}
	}

	private void converterDeDTO(ProdutoDTO dto, Produto produto) {
		produto.setNome(dto.getNome());
		produto.setDescricao(dto.getDescricao());
		produto.setData(dto.getData());
		produto.setImgUrl(dto.getImgUrl());
		produto.setPreco(dto.getPreco());
		
		produto.getCategorias().clear();
		for(CategoriaDTO categoriaDTO : dto.getCategorias()) {
			Categoria categoria = categoriaRepository.getOne(categoriaDTO.getId());
			produto.getCategorias().add(categoria);
		}
	}

	public UriDTO uploadArquivo(MultipartFile arquivo) {
		URL url = s3Service.uploadFile(arquivo);
		
		return new UriDTO(url.toString());
	}
}
