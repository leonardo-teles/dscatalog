package com.devsuperior.dscatalog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devsuperior.dscatalog.model.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {

}
