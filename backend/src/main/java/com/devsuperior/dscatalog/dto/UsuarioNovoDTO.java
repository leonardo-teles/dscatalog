package com.devsuperior.dscatalog.dto;

public class UsuarioNovoDTO extends UsuarioDTO {
	private static final long serialVersionUID = 1L;

	private String senha;

	public UsuarioNovoDTO() {
		super();
	}
	
	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}
}
