package com.example.demo.repository;

import com.example.demo.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    // 🔍 Search by name, department, or role (case-insensitive, partial match)
    List<Employee> findByNameContainingIgnoreCaseOrDepartmentContainingIgnoreCaseOrRoleContainingIgnoreCase(
            String name, String department, String role
    );
}
