package com.example.backend.utils

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.security.Keys
import java.util.Date

object JwtUtil {
    /*private const val SECRET_KEY = "mySecretKey" // Geheime Schlüssel, in Env-Variablen speichern
    private const val EXPIRATION_TIME = 1000 * 60 * 60 * 10 // 10 Stunden*/

    private val key = Keys.secretKeyFor(SignatureAlgorithm.HS256) // Securely generates a 256-bit key

    fun generateToken(id: Int, email: String, firstName: String, lastName: String, department: String): String {
        return Jwts.builder()
            .setSubject(email)
            .claim("id", id)
            .claim("firstName", firstName)
            .claim("lastName", lastName)
            .claim("department", department)
            .setIssuedAt(Date())
            .setExpiration(Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 Stunde Gültigkeit
            .signWith(key)
            .compact()
    }
}
