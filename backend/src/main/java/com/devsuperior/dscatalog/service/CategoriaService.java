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
import com.devsuperior.dscatalog.model.Categoria;
import com.devsuperior.dscatalog.repository.CategoriaRepository;
import com.devsuperior.dscatalog.service.exception.DataIntegrityException;
import com.devsuperior.dscatalog.service.exception.ObjectNotFoundException;

@Service
public class CategoriaService {

	@Autowired
	private CategoriaRepository categoriaRepository;
	
	
	@Transactional(readOnly = true)
	public Page<CategoriaDTO> buscarTodasComPaginacao(PageRequest pageRequest) {
		Page<Categoria> lista = categoriaRepository.findAll(pageRequest);
		
		return lista.map(categoria -> new CategoriaDTO(categoria));
	}

	@Transactional(readOnly = true)
	public CategoriaDTO buscarPorId(Long id) {
		Optional<Categoria> opt = categoriaRepository.findById(id);
		
		Categoria categoria = opt.orElseThrow(() -> new ObjectNotFoundException("Recurso Buscado: " + id + ", "
											  + "Objeto Não Localizado: " + Categoria.class.getSimpleName()));
		
		return new CategoriaDTO(categoria);
	}

	@Transactional
	public CategoriaDTO salvar(CategoriaDTO dto) {
		Categoria categoria = new Categoria();
		categoria.setNome(dto.getNome());
		
		categoria = categoriaRepository.save(categoria);

		return new CategoriaDTO(categoria);
	}

	@Transactional
	public CategoriaDTO atualizar(Long id, CategoriaDTO dto) {
		try {
			Categoria categoria = categoriaRepository.getOne(id);
			categoria.setNome(dto.getNome());

			categoria = categoriaRepository.save(categoria);
			
			return new CategoriaDTO(categoria);
			
		} catch (EntityNotFoundException e) {
			throw new ObjectNotFoundException("Id Não Encontrado: " + id);
		}
	}

	public void apagar(Long id) {
		try {
			categoriaRepository.deleteById(id);
		
		} catch(EmptyResultDataAccessException e) {
			throw new ObjectNotFoundException("Id Número: " + id);
		
		} catch(DataIntegrityViolationException e) {
			throw new DataIntegrityException("Não é possível excluir uma categoria que possui produtos.");
		}
	}
}
