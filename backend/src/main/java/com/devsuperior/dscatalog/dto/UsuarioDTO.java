package com.devsuperior.dscatalog.dto;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import com.devsuperior.dscatalog.model.Usuario;

public class UsuarioDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	
	@NotBlank(message = "O nome é obrigatório")
	private String nome;
	
	private String sobrenome;
	
	@Email(message = "e-Mail inválido")
	private String email;
	
	private Set<PerfilDTO> perfis = new HashSet<>();

	public UsuarioDTO() {}

	public UsuarioDTO(Long id, String nome, String sobrenome, String email) {
		this.id = id;
		this.nome = nome;
		this.sobrenome = sobrenome;
		this.email = email;
	}
	
	public UsuarioDTO(Usuario usuario) {
		id = usuario.getId();
		nome = usuario.getNome();
		sobrenome = usuario.getSobrenome();
		email = usuario.getEmail();
		usuario.getPerfis().forEach(perfil -> this.perfis.add(new PerfilDTO(perfil)));
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getSobrenome() {
		return sobrenome;
	}

	public void setSobrenome(String sobrenome) {
		this.sobrenome = sobrenome;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	public Set<PerfilDTO> getPerfis() {
		return perfis;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UsuarioDTO other = (UsuarioDTO) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
}
