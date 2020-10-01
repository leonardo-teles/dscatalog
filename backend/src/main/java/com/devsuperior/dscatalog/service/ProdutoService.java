package com.devsuperior.dscatalog.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dscatalog.dto.ProdutoDTO;
import com.devsuperior.dscatalog.model.Produto;
import com.devsuperior.dscatalog.repository.ProdutoRepository;
import com.devsuperior.dscatalog.service.exception.DataIntegrityException;
import com.devsuperior.dscatalog.service.exception.ObjectNotFoundException;

@Service
public class ProdutoService {

	@Autowired
	private ProdutoRepository produtoRepository;
	
	@Transactional(readOnly = true)
	public List<ProdutoDTO> buscarTodas() {
		List<Produto> lista =  produtoRepository.findAll();

		return lista.stream().map(produto -> new ProdutoDTO(produto)).collect(Collectors.toList());
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
		//produto.setNome(dto.getNome());
		
		produto = produtoRepository.save(produto);

		return new ProdutoDTO(produto);
	}

	@Transactional
	public ProdutoDTO atualizar(Long id, ProdutoDTO dto) {
		try {
			Produto produto = produtoRepository.getOne(id);
			//produto.setNome(dto.getNome());

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
			throw new DataIntegrityException("Não é possível excluir uma produto que possui produtos.");
		}
	}

	public Page<ProdutoDTO> listarComPaginacao(PageRequest pageRequest) {
		Page<Produto> lista = produtoRepository.findAll(pageRequest);
		
		return lista.map(produto -> new ProdutoDTO(produto));
	}
	
}
