package com.example.backendGIS.repository;


import com.example.backendGIS.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

//inteface extends JPA

// Creat User class
public interface UserRepository extends JpaRepository<User, Long> {

}
