package com.devsuperior.dscatalog.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.devsuperior.dscatalog.model.Categoria;
import com.devsuperior.dscatalog.model.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {

	@Query("SELECT p FROM Produto p JOIN FETCH p.categorias WHERE p IN :produtos")
	List<Produto> find(List<Produto> produtos);

	@Query("SELECT DISTINCT p FROM Produto p INNER JOIN p.categorias c WHERE "
			+ "(COALESCE(:categorias) IS NULL OR c IN :categorias) AND "
			+ "(LOWER(p.nome) LIKE LOWER(CONCAT('%',:nome,'%')))")
	Page<Produto> buscarComCategoria(List<Categoria> categorias, String nome, Pageable pageable);
}
