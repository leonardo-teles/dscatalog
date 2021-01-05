package com.devsuperior.dscatalog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devsuperior.dscatalog.model.Perfil;

@Repository
public interface PerfilRepository extends JpaRepository<Perfil, Long> {

}
