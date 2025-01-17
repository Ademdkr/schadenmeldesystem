package com.example.backend.service

import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import jakarta.mail.internet.MimeMessage
import org.junit.jupiter.api.Test
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.mail.javamail.MimeMessageHelper

class EmailServiceTests {

    @Test
    fun `sendEmail should create and send email`() {
        val mailSender = mockk<JavaMailSender>(relaxed = true)
        val mimeMessage = mockk<MimeMessage>(relaxed = true)
        every { mailSender.createMimeMessage() } returns mimeMessage

        val emailService = EmailService(mailSender)
        emailService.sendEmail("test@example.com", "Test Subject", "Test Body")

        // Überprüfe, dass mailSender.send mit dem MimeMessage aufgerufen wurde.
        verify { mailSender.send(mimeMessage) }
    }
}
