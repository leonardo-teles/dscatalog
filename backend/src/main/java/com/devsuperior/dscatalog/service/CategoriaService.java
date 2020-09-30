package com.devsuperior.dscatalog.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devsuperior.dscatalog.model.Categoria;
import com.devsuperior.dscatalog.repository.CategoriaRepository;

@Service
public class CategoriaService {

	@Autowired
	private CategoriaRepository categoriaRepository;
	
	public List<Categoria> buscarTodas() {
		return categoriaRepository.findAll();
	}
}
