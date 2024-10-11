package com.example.backendGIS.repository;


import com.example.backendGIS.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

//inteface extends JPA

// Creat User class
public interface UserRepository extends JpaRepository<User, Long> {
//    @Query(value = "SELECT * FROM user WHERE username = ?1", nativeQuery = true)
    Optional<User> findByUsername(String username);
//    User findByUsername(String username );
}
