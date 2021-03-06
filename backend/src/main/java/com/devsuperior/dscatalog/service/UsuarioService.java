package com.devsuperior.dscatalog.service;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dscatalog.dto.PerfilDTO;
import com.devsuperior.dscatalog.dto.UsuarioAtualizadoDTO;
import com.devsuperior.dscatalog.dto.UsuarioDTO;
import com.devsuperior.dscatalog.dto.UsuarioNovoDTO;
import com.devsuperior.dscatalog.model.Perfil;
import com.devsuperior.dscatalog.model.Usuario;
import com.devsuperior.dscatalog.repository.PerfilRepository;
import com.devsuperior.dscatalog.repository.UsuarioRepository;
import com.devsuperior.dscatalog.service.exception.DataIntegrityException;
import com.devsuperior.dscatalog.service.exception.ObjectNotFoundException;

@Service
public class UsuarioService implements UserDetailsService {

	private static Logger logger = LoggerFactory.getLogger(UsuarioService.class);
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Autowired
	private PerfilRepository perfilRepository;
	
	@Autowired
	private BCryptPasswordEncoder encoder;
	
	@Transactional(readOnly = true)
	public Page<UsuarioDTO> buscarTodosComPaginacao(PageRequest pageRequest) {
		Page<Usuario> lista = usuarioRepository.findAll(pageRequest);
		
		return lista.map(usuario -> new UsuarioDTO(usuario));
	}

	@Transactional(readOnly = true)
	public UsuarioDTO buscarPorId(Long id) {
		Optional<Usuario> opt = usuarioRepository.findById(id);
		
		Usuario usuario = opt.orElseThrow(() -> new ObjectNotFoundException("Recurso Buscado: " + id + ", "
											  + "Objeto N??o Localizado: " + Usuario.class.getSimpleName()));
		
		return new UsuarioDTO(usuario);
	}

	@Transactional
	public UsuarioDTO salvar(UsuarioNovoDTO dto) {
		Usuario usuario = new Usuario();
		converterDeDTO(dto, usuario);
		
		usuario.setSenha(encoder.encode(dto.getSenha()));
		
		usuario = usuarioRepository.save(usuario);

		return new UsuarioDTO(usuario);
	}

	@Transactional
	public UsuarioDTO atualizar(Long id, UsuarioAtualizadoDTO dto) {
		try {
			Usuario usuario = usuarioRepository.getOne(id);
			converterDeDTO(dto, usuario);

			usuario = usuarioRepository.save(usuario);
			
			return new UsuarioDTO(usuario);
			
		} catch (EntityNotFoundException e) {
			throw new ObjectNotFoundException("Id N??o Encontrado: " + id);
		}
	}

	public void apagar(Long id) {
		try {
			usuarioRepository.deleteById(id);
		
		} catch(EmptyResultDataAccessException e) {
			throw new ObjectNotFoundException("Id N??mero: " + id);
		
		} catch(DataIntegrityViolationException e) {
			throw new DataIntegrityException("Erro ao excluir o usu??rio.");
		}
	}

	private void converterDeDTO(UsuarioDTO dto, Usuario usuario) {
		usuario.setNome(dto.getNome());
		usuario.setSobrenome(dto.getSobrenome());
		usuario.setEmail(dto.getEmail());
		
		usuario.getPerfis().clear();
		for(PerfilDTO perfilDTO : dto.getPerfis()) {
			Perfil perfil = perfilRepository.getOne(perfilDTO.getId());
			usuario.getPerfis().add(perfil);
		}
	}

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Usuario usuario = usuarioRepository.findByEmail(email);
		if(usuario == null) {
			logger.error("Usu??rio n??o encontrado: " + email);
			throw new UsernameNotFoundException("Usu??rio n??o encontrado");
		}
		logger.info("Usu??rio encontrado: " + email);
		
		return usuario;
	}

}
