package com.devsuperior.dscatalog.dto;

import java.io.Serializable;

import org.springframework.web.multipart.MultipartFile;

public class ArquivoDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private MultipartFile arquivo;

	public ArquivoDTO() {}

	public MultipartFile getArquivo() {
		return arquivo;
	}

	public void setArquivo(MultipartFile arquivo) {
		this.arquivo = arquivo;
	}
	
}
