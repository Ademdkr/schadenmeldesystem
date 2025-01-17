package com.example.backend.controller

import com.example.backend.model.LoginRequest
import com.example.backend.model.User
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

// Spring Boot Authentication Controller
@RestController
@RequestMapping("/api/auth")
class AuthController {

    @PostMapping("/login")
    fun login(@RequestBody loginRequest: LoginRequest): ResponseEntity<Any> {
        val users = listOf(
            User(1,"Fahrer", "Max", "Mustermann", "max.mustermann@example.com", "password123"),
            User(2, "Fahrer", "Anna", "Müller", "anna.mueller@example.com", "password123"),
            User(3,"Werkstatt", "Hans", "Günther", "max.mustermann@example.com", "password123"),
            User(4, "Disposition", "Olli", "Pocher", "anna.mueller@example.com", "password123")
        )

        val user = users.find { it.email == loginRequest.email && it.password == loginRequest.password }
        return if (user != null) {
            ResponseEntity.ok(mapOf("message" to "Login erfolgreich", "user" to user))
        } else {
            ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(mapOf("message" to "Ungültige Anmeldedaten"))
        }
    }
}