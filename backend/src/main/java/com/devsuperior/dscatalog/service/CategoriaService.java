package com.devsuperior.dscatalog.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dscatalog.dto.CategoriaDTO;
import com.devsuperior.dscatalog.model.Categoria;
import com.devsuperior.dscatalog.repository.CategoriaRepository;

@Service
public class CategoriaService {

	@Autowired
	private CategoriaRepository categoriaRepository;
	
	@Transactional(readOnly = true)
	public List<CategoriaDTO> buscarTodas() {
		List<Categoria> lista =  categoriaRepository.findAll();

		return lista.stream().map(c -> new CategoriaDTO(c)).collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public CategoriaDTO buscarPorId(Long id) {
		Optional<Categoria> opt = categoriaRepository.findById(id);
		Categoria categoria = opt.get();
		
		return new CategoriaDTO(categoria);
	}
}
