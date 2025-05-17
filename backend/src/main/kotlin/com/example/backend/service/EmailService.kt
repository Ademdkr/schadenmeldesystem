package com.example.backend.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.mail.javamail.MimeMessageHelper
import org.springframework.stereotype.Service

@Service
class EmailService(@Autowired private val mailSender: JavaMailSender) {

    fun sendEmail(to: String, subject: String, body: String) {
        val mimeMessage = mailSender.createMimeMessage()
        val helper = MimeMessageHelper(mimeMessage, true)
        helper.setTo(to)
        helper.setSubject(subject)
        helper.setText(body, true)
        mailSender.send(mimeMessage)
    }
}
