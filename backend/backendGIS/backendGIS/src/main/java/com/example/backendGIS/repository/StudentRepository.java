package com.example.backendGIS.repository;

import com.example.backendGIS.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentInterface extends JpaRepository<Student,Long> {
}
