package com.devsuperior.dscatalog.resource;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.devsuperior.dscatalog.dto.CategoriaDTO;
import com.devsuperior.dscatalog.service.CategoriaService;

@RestController
@RequestMapping(value = "/categorias")
public class CategoriaResource {

	@Autowired
	private CategoriaService categoriaService;
	
	@GetMapping
	public ResponseEntity<List<CategoriaDTO>> buscarTodas() {
		List<CategoriaDTO> lista = categoriaService.buscarTodas();
		
		return ResponseEntity.ok().body(lista);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<CategoriaDTO> buscarPorId(@PathVariable Long id) {
		CategoriaDTO dto = categoriaService.buscarPorId(id);
		
		return ResponseEntity.ok().body(dto);
	}
	
	@PostMapping
	public ResponseEntity<CategoriaDTO> inserir(@RequestBody CategoriaDTO dto) {
		dto = categoriaService.salvar(dto);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(dto.getId()).toUri();
		
		return ResponseEntity.created(uri).build();
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<CategoriaDTO> atualizar(@PathVariable Long id, @RequestBody CategoriaDTO dto) {
		dto = categoriaService.atualizar(id, dto);
		
		return ResponseEntity.noContent().build();
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<CategoriaDTO> apagar(@PathVariable Long id) {
		categoriaService.apagar(id);
		
		return ResponseEntity.noContent().build();
	}	
	
}
