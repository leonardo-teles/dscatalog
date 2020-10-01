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
import com.devsuperior.dscatalog.service.exception.ObjectNotFoundException;

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
	
}
