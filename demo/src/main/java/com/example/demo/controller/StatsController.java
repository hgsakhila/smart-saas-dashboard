package com.example.demo.controller;

import com.example.demo.model.Employee;
import com.example.demo.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.TextStyle;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // adjust if needed
public class StatsController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping("/stats")
    public List<Map<String, Object>> getStats() {
        List<Employee> employees = employeeRepository.findAll();

        // Map to hold count by month (e.g., "Jan", "Feb")
        Map<String, Integer> countByMonth = new LinkedHashMap<>();

        for (Employee emp : employees) {
            LocalDateTime createdAt = emp.getCreatedAt();
            String month = createdAt.getMonth()
                    .getDisplayName(TextStyle.SHORT, Locale.ENGLISH); // "Jan", "Feb", etc.

            countByMonth.put(month, countByMonth.getOrDefault(month, 0) + 1);
        }

        // Prepare the response
        List<Map<String, Object>> response = new ArrayList<>();
        for (Map.Entry<String, Integer> entry : countByMonth.entrySet()) {
            Map<String, Object> item = new HashMap<>();
            item.put("month", entry.getKey());
            item.put("count", entry.getValue());
            response.add(item);
        }

        return response;
    }
}
