package com.devsuperior.dscatalog.resource;

import java.net.URI;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.devsuperior.dscatalog.dto.UsuarioDTO;
import com.devsuperior.dscatalog.dto.UsuarioNovoDTO;
import com.devsuperior.dscatalog.service.UsuarioService;

@RestController
@RequestMapping(value = "/usuarios")
public class UsuarioResource {

	@Autowired
	private UsuarioService usuarioService;
	
	@GetMapping
	public ResponseEntity<Page<UsuarioDTO>> buscarTodosComPaginacao(
			@RequestParam(value = "pagina", defaultValue = "0") Integer pagina, 
			@RequestParam(value = "linhasPorPagina", defaultValue = "12") Integer linhasPorPagina, 
			@RequestParam(value = "direcaoOrdenacao", defaultValue = "ASC") String direcaoOrdenacao,
			@RequestParam(value = "ordenarPor", defaultValue = "nome") String ordernarPor) {
		
		PageRequest pageRequest = PageRequest.of(pagina, linhasPorPagina, Direction.valueOf(direcaoOrdenacao), ordernarPor);
		
		Page<UsuarioDTO> pageDto = usuarioService.buscarTodosComPaginacao(pageRequest);
		
		return ResponseEntity.ok().body(pageDto);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<UsuarioDTO> buscarPorId(@PathVariable Long id) {
		UsuarioDTO dto = usuarioService.buscarPorId(id);
		
		return ResponseEntity.ok().body(dto);
	}
	
	@PostMapping
	public ResponseEntity<UsuarioDTO> inserir(@Valid @RequestBody UsuarioNovoDTO dto) {
		UsuarioDTO novoDto = usuarioService.salvar(dto);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(novoDto.getId()).toUri();
		
		return ResponseEntity.created(uri).build();
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<UsuarioDTO> atualizar(@Valid @PathVariable Long id, @RequestBody UsuarioDTO dto) {
		dto = usuarioService.atualizar(id, dto);
		
		return ResponseEntity.noContent().build();
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<UsuarioDTO> apagar(@PathVariable Long id) {
		usuarioService.apagar(id);
		
		return ResponseEntity.noContent().build();
	}	
}
