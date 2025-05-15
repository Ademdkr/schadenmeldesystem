package com.example.backend.model

// Kotlin Data Classes
data class User(
    val id: Int,
    val department: String,
    val firstName: String,
    val lastName: String,
    val email: String,
    val password: String
)

data class LoginRequest(
    val email: String,
    val password: String
)
