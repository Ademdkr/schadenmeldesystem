package com.example.backend.service

import com.example.backend.controller.AuthController
import com.example.backend.model.Auftrag
import com.example.backend.repository.AuftragRepository
import org.springframework.stereotype.Service

@Service
class AuftragService(
    private val repository: AuftragRepository,
    private val emailService: EmailService,
    private val authController: AuthController // Füge den AuthController hinzu, um auf die Benutzer zugreifen zu können
) {
    fun save(auftrag: Auftrag): Auftrag = repository.save(auftrag)

    fun getAuftraegeByStatus(status: String): List<Auftrag> = repository.findByStatus(status)

    fun findById(id: Long): Auftrag? = repository.findById(id).orElse(null)

    fun updateAuftrag(id: Long, updates: Map<String, Any?>): Auftrag {
        val auftrag = repository.findById(id).orElseThrow { IllegalArgumentException("Auftrag not found") }
        val vorherigerStatus = auftrag.status
        val vorherigeAbgabeBestaetigt = auftrag.abgabeBestaetigt

        updates.forEach { (key, value) ->
            when (key) {
                "status" -> auftrag.status = value as? String
                "abgabeOrt" -> auftrag.abgabeOrt = value as? String
                "abgabeDatum" -> auftrag.abgabeDatum = value as? String
                "abgabeBestaetigt" -> auftrag.abgabeBestaetigt = value as? Boolean
                "reparaturStart" -> auftrag.reparaturStart = value as? String
                "reparaturEnde" -> auftrag.reparaturEnde = value as? String
                "bearbeiter" -> auftrag.bearbeiter = value as? String
                "bearbeiterEmail" -> auftrag.bearbeiterEmail = value as? String
            }
        }

        val aktualisierterAuftrag = repository.save(auftrag)
        sendStatusUpdateEmail(vorherigerStatus, vorherigeAbgabeBestaetigt, auftrag)
        return aktualisierterAuftrag
    }

    fun sendStatusUpdateEmail(vorherigerStatus: String?, vorherigeAbgabeBestaetigt: Boolean?, auftrag: Auftrag) {
        if (auftrag.abgabeBestaetigt == true && vorherigeAbgabeBestaetigt != true) {
            // Sende E-Mail an alle Benutzer der "Werkstatt"-Rolle
            val werkstattEmails = authController.users.filter { it.department == "Werkstatt" }.map { it.email }
            val subject = "Auftrag Abgabe Bestätigt"
            val message = "Die Abgabe des Auftrags mit der ID ${auftrag.auftragId} wurde bestätigt."
            werkstattEmails.forEach { emailService.sendEmail(it, subject, message) }
        } else if (auftrag.email != null && vorherigerStatus != auftrag.status) {
            val subject = "Auftrag ${auftrag.status}"
            val message = "Ihr Auftrag mit der ID ${auftrag.auftragId} wurde als ${auftrag.status} markiert."
            emailService.sendEmail(auftrag.email!!, subject, message)
        }
    }
}
