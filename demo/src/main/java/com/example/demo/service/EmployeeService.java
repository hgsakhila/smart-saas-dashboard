package com.example.demo.service;

import com.example.demo.model.Employee;
import com.example.demo.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    // ✅ Add new employee
    public Employee addEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    // ✅ Get all employees
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // ✅ Delete employee by ID
    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }

    // ✅ Group stats by month for chart display
    public List<Map<String, Object>> getEmployeeStatsPerMonth() {
        List<Employee> employees = employeeRepository.findAll();

        // Group by month name (e.g., June, July)
        Map<String, Long> monthCount = employees.stream()
                .filter(e -> e.getCreatedAt() != null)
                .collect(Collectors.groupingBy(
                        e -> new SimpleDateFormat("MMMM").format(e.getCreatedAt()),
                        Collectors.counting()
                ));

        // Convert Map to List of { "month": "June", "count": 3 }
        return monthCount.entrySet().stream()
                .map(entry -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("month", entry.getKey());
                    map.put("count", entry.getValue());
                    return map;
                })
                .collect(Collectors.toList());
    }
    public Employee updateEmployee(Long id, Employee updatedEmployee) {
        return employeeRepository.findById(id).map(existing -> {
            existing.setName(updatedEmployee.getName());
            existing.setDepartment(updatedEmployee.getDepartment());
            existing.setRole(updatedEmployee.getRole());
            return employeeRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Employee not found"));
    }
    public List<Employee> searchEmployees(String query) {
        return employeeRepository.findByNameContainingIgnoreCaseOrDepartmentContainingIgnoreCaseOrRoleContainingIgnoreCase(
                query, query, query
        );
    }



}
