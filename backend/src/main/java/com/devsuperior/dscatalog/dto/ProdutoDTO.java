package com.devsuperior.dscatalog.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.PastOrPresent;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

import com.devsuperior.dscatalog.model.Categoria;
import com.devsuperior.dscatalog.model.Produto;

public class ProdutoDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	
	@Size(min = 5, max = 60, message = "O nome deve ter entre 5 e 60 caracteres")
	@NotBlank(message = "O nome é obrigatório")
	private String nome;
	
	@NotBlank(message = "A descrição é obrigatória")
	private String descricao;

	@Positive(message = "O preço deve ter valor positivo")
	private BigDecimal preco;
	
	private String imgUrl;
	
	@PastOrPresent(message = "A data não pode ser futura")
	private Instant data;
	
	private List<CategoriaDTO> categorias = new ArrayList<>();

	public ProdutoDTO() {}

	public ProdutoDTO(Long id, String nome, String descricao, BigDecimal preco, String imgUrl, Instant data) {
		this.id = id;
		this.nome = nome;
		this.descricao = descricao;
		this.preco = preco;
		this.imgUrl = imgUrl;
		this.data = data;
	}
	
	public ProdutoDTO(Produto produto) {
		this.id = produto.getId();
		this.nome = produto.getNome();
		this.descricao = produto.getDescricao();
		this.preco = produto.getPreco();
		this.imgUrl = produto.getImgUrl();
		this.data = produto.getData();
	}

	public ProdutoDTO(Produto produto, Set<Categoria> categorias) {
		this(produto);
		categorias.forEach(categoria -> this.categorias.add(new CategoriaDTO(categoria)));
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

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public BigDecimal getPreco() {
		return preco;
	}

	public void setPreco(BigDecimal preco) {
		this.preco = preco;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public Instant getData() {
		return data;
	}

	public void setData(Instant data) {
		this.data = data;
	}

	public List<CategoriaDTO> getCategorias() {
		return categorias;
	}

	public void setCategorias(List<CategoriaDTO> categorias) {
		this.categorias = categorias;
	}
}
