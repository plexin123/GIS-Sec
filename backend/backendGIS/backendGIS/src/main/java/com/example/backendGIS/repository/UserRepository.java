package com.example.backendGIS.repository;


import com.example.backendGIS.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

//inteface extends JPA

// Creat User class
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);
//    User findByUsername(String username );
}
