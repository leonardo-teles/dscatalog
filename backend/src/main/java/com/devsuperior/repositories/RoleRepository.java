package com.devsuperior.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devsuperior.entities.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

}
