package com.example.backend.service

import com.example.backend.controller.AuthController
import com.example.backend.model.Auftrag
import com.example.backend.repository.AuftragRepository
import io.mockk.*
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import java.time.LocalDateTime
import java.util.*

class AuftragServiceTests {

    private lateinit var repository: AuftragRepository
    private lateinit var emailService: EmailService
    private lateinit var authController: AuthController
    private lateinit var service: AuftragService

    @BeforeEach
    fun setUp() {
        repository = mockk()
        emailService = mockk(relaxed = true)
        authController = spyk(AuthController())
        service = AuftragService(repository, emailService, authController)
    }

    @Test
    fun `save should delegate to repository`() {
        val auftrag = Auftrag(
            kennzeichen = "AB-123",
            beschreibung = "Testauftrag",
            fahrtuechtig = true,
            standort = "Standort1"
        )
        every { repository.save(any()) } returns auftrag

        val result = service.save(auftrag)

        verify { repository.save(auftrag) }
        assertEquals(auftrag, result)
    }

    @Test
    fun `getAuftraegeByStatus should delegate to repository`() {
        val status = "Offen"
        val auftragList = listOf(
            Auftrag(
                kennzeichen = "AB-123",
                beschreibung = "Testauftrag",
                fahrtuechtig = true,
                standort = "Standort1",
                status = status
            )
        )
        every { repository.findByStatus(status) } returns auftragList

        val result = service.getAuftraegeByStatus(status)

        verify { repository.findByStatus(status) }
        assertEquals(auftragList, result)
    }

    @Test
    fun `findById should return Auftrag when present`() {
        val auftrag = Auftrag(
            auftragId = 1,
            kennzeichen = "CD-456",
            beschreibung = "Ein Auftrag",
            fahrtuechtig = false,
            standort = "Standort2"
        )
        every { repository.findById(1) } returns Optional.of(auftrag)

        val result = service.findById(1)

        verify { repository.findById(1) }
        assertNotNull(result)
        assertEquals(auftrag, result)
    }

    @Test
    fun `updateAuftrag should update fields and send email if status changes`() {
        val existingAuftrag = Auftrag(
            auftragId = 1,
            kennzeichen = "EF-789",
            beschreibung = "Update Test",
            fahrtuechtig = true,
            standort = "Standort3",
            status = "Offen",
            abgabeBestaetigt = false,
            email = "kunde@example.com"
        )
        every { repository.findById(1) } returns Optional.of(existingAuftrag)
        every { repository.save(any()) } answers { firstArg() }

        // Update: Änderung des Status
        val updates = mapOf("status" to "Abgeschlossen")
        service.updateAuftrag(1, updates)

        // Überprüfe, dass das Feld aktualisiert wurde
        assertEquals("Abgeschlossen", existingAuftrag.status)
        verify { repository.save(existingAuftrag) }
        // Da status sich ändert, sollte EmailService.sendEmail aufgerufen werden (an den Kunden)
        verify { emailService.sendEmail("kunde@example.com", any(), any()) }
    }

    @Test
    fun `updateAuftrag should send Werkstatt-Email when abgabeBestaetigt becomes true`() {
        // Test, wenn abgabeBestaetigt von false zu true wechselt und Nutzer mit der Rolle "Werkstatt" vorhanden sind.
        val existingAuftrag = Auftrag(
            auftragId = 2,
            kennzeichen = "GH-101",
            beschreibung = "Werkstatt Test",
            fahrtuechtig = false,
            standort = "Standort4",
            status = "In Bearbeitung",
            abgabeBestaetigt = false
        )
        every { repository.findById(2) } returns Optional.of(existingAuftrag)
        every { repository.save(any()) } answers { firstArg() }

        // Erstelle einen Update, der abgabeBestaetigt auf true setzt
        val updates = mapOf("abgabeBestaetigt" to true)
        service.updateAuftrag(2, updates)

        // Damit der Test konsistent ist, fügen wir in authController mindestens einen Benutzer aus der Werkstatt hinzu
        // (Die in AuthController definierten Benutzer werden genutzt.)
        val werkstattUsers = authController.users.filter { it.department == "Werkstatt" }
        werkstattUsers.forEach {
            verify { emailService.sendEmail(it.email, "Auftrag Abgabe Bestätigt", match { it.contains("2") }) }
        }
    }
}
