package com.example.backend.controller

import com.example.backend.model.LoginRequest
import com.example.backend.model.User
import com.example.backend.utils.JwtUtil
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

// Spring Boot Authentication Controller
@RestController
@RequestMapping("/api/auth")
class AuthController {

    val users = listOf(
        User(1, "Fahrer", "Max", "Mustermann", "max.mustermann+1@inbox.mailtrap.io", "password123"),
        User(2, "Fahrer", "Anna", "Müller", "anna.mueller+1@inbox.mailtrap.io", "password123"),
        User(3, "Werkstatt", "Hans", "Günther", "hans.guenther+1@inbox.mailtrap.io", "password123"),
        User(4, "Werkstatt", "Olli", "Pocher", "olli.pocher+1@inbox.mailtrap.io", "password123")
    )

    @PostMapping("/login")
    fun login(@RequestBody loginRequest: LoginRequest): ResponseEntity<Any> {
        val user = users.find { it.email == loginRequest.email && it.password == loginRequest.password }
        return if (user != null) {
            // Token mit allen notwendigen Feldern erzeugen
            val token = JwtUtil.generateToken(user.id, user.email, user.firstName, user.lastName, user.department)
            ResponseEntity.ok(mapOf("token" to token, "user" to user))
        } else {
            ResponseEntity.status(401).body(mapOf("message" to "Ungültige Anmeldedaten"))
        }
    }
}
