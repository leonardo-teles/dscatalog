package com.devsuperior.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devsuperior.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}
