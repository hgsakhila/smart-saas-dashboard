package com.example.demo.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    // Secret key for signing the JWT (keep it private)
    private static final String SECRET_KEY = "my-super-secret-key-which-should-be-long-enough";

    // Validity: 24 hours
    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 24;

    // 🔐 Generate JWT Token
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // ✅ Validate token and extract username
    public String validateTokenAndGetUsername(String token) {
        try {
            Claims claims = Jwts
                    .parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            return claims.getSubject(); // username
        } catch (JwtException e) {
            // Invalid token (expired, tampered, etc.)
            return null;
        }
    }

    // 🔑 Convert secret string to signing key
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }
}
