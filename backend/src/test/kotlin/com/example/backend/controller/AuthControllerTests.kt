package com.example.backend.controller

import com.example.backend.model.LoginRequest
import com.example.backend.model.User
import com.example.backend.utils.JwtUtil
import com.fasterxml.jackson.databind.ObjectMapper
import org.hamcrest.CoreMatchers.containsString
import org.junit.jupiter.api.Test
import org.mockito.Mockito
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*

@WebMvcTest(AuthController::class)
class AuthControllerTests {

    @Autowired
    lateinit var mockMvc: MockMvc

    @Autowired
    lateinit var objectMapper: ObjectMapper

    @Test
    fun `POST login with valid credentials should return token and user`() {
        // Nutzt die in AuthController fest verdefinierten Benutzer
        val loginRequest = LoginRequest(email = "max.mustermann+1@inbox.mailtrap.io", password = "password123")

        mockMvc.perform(
            post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest))
        )
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.token").isNotEmpty)
            .andExpect(jsonPath("$.user.email").value("max.mustermann+1@inbox.mailtrap.io"))
    }

    @Test
    fun `POST login with invalid credentials should return 401`() {
        val loginRequest = LoginRequest(email = "invalid@example.com", password = "wrongpassword")

        mockMvc.perform(
            post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest))
        )
            .andExpect(status().isUnauthorized)
            .andExpect(jsonPath("$.message", containsString("Ungültige")))
    }
}
