package com.devsuperior.dscatalog.service;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dscatalog.dto.CategoriaDTO;
import com.devsuperior.dscatalog.dto.ProdutoDTO;
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
	
	@Transactional(readOnly = true)
	public Page<ProdutoDTO> buscarTodosComPaginacao(PageRequest pageRequest) {
		Page<Produto> lista = produtoRepository.findAll(pageRequest);
		
		return lista.map(produto -> new ProdutoDTO(produto));
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

	@Transactional
	public void apagar(Long id) {
		try {
			produtoRepository.deleteById(id);
		
		} catch(EmptyResultDataAccessException e) {
			throw new ObjectNotFoundException("Id Número: " + id);
		
		} catch(DataIntegrityViolationException e) {
			throw new DataIntegrityException("Não é possível excluir uma produto que possui produtos.");
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
}
