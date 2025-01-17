package com.example.backend.service
import com.example.backend.model.Auftrag
import com.example.backend.model.User
import com.example.backend.repository.AuftragRepository
import org.springframework.stereotype.Service
import java.time.LocalDateTime

@Service
class AuftragService(
    private val repository: AuftragRepository,
    private val emailService: EmailService
) {
    fun save(auftrag: Auftrag): Auftrag = repository.save(auftrag)

    fun getAuftraegeByStatus(status: String): List<Auftrag> {
        return repository.findByStatus(status)
    }

    fun findById(id: Long): Auftrag? = repository.findById(id).orElse(null)

    fun updateAuftrag(
        id: Long,
        status: String,
        abgabeOrt: String?,
        abgabeDatum: String?,
        abgabeBestaetigt: Boolean?,
        reparaturStart: String?,
        reparaturEnde: String?,
        bearbeiter: String?,
        bearbeiterEmail: String?,
    ): Auftrag {
        val auftrag = repository.findById(id).orElseThrow { IllegalArgumentException("Auftrag not found") }

        val vorherigerStatus = auftrag.status
        auftrag.status = status

        if (abgabeOrt != null) auftrag.abgabeOrt = abgabeOrt
        if (abgabeDatum != null) auftrag.abgabeDatum = abgabeDatum
        if (abgabeBestaetigt != null) auftrag.abgabeBestaetigt = abgabeBestaetigt
        if (reparaturStart != null) auftrag.reparaturStart = reparaturStart
        if (reparaturEnde != null) auftrag.reparaturEnde = reparaturEnde
        if (bearbeiter != null) auftrag.bearbeiter = bearbeiter
        if (bearbeiterEmail != null) auftrag.bearbeiterEmail = bearbeiterEmail

        val aktualisierterAuftrag = repository.save(auftrag)

        // Prüfen, ob der Status auf "Terminiert" gesetzt wurde und vorher anders war
        if (vorherigerStatus != "Terminiert" && status == "Terminiert") {
            auftrag.email?.let { email ->
                emailService.sendEmail(
                    email,
                    "Auftrag wurde terminiert",
                    "Ihr Auftrag mit der ID ${auftrag.auftragId} wurde terminiert."
                )
            }
        }

        if (status == "In Bearbeitung" && vorherigerStatus != "In Bearbeitung") {
            auftrag.email?.let { email ->
                emailService.sendEmail(
                    email,
                    "Auftrag in Bearbeitung",
                    "Ihr Auftrag mit der ID ${auftrag.auftragId} wurde in Bearbeitung genommen."
                )
            }
        }

        if (status == "Abgeschlossen" && vorherigerStatus != "Abgeschlossen") {
            auftrag.email?.let { email ->
                emailService.sendEmail(
                    email,
                    "Auftrag Abgeschlossen",
                    "Ihr Auftrag mit der ID ${auftrag.auftragId} wurde als abgeschlossen markiert."
                )
            }
        }

        return aktualisierterAuftrag
    }


    fun updateAbgabeBestaetigt(id: Long, abgabeBestaetigt: Boolean): Auftrag {
        val auftrag = repository.findById(id).orElseThrow { IllegalArgumentException("Auftrag not found") }

        if (auftrag.abgabeBestaetigt == true) {
            throw IllegalStateException("Abgabe wurde bereits bestätigt und kann nicht erneut geändert werden.")
        }

        auftrag.abgabeBestaetigt = abgabeBestaetigt
        val aktualisierterAuftrag = repository.save(auftrag)

        // Wenn die Abgabe bestätigt wurde, alle "Werkstatt"-Benutzer benachrichtigen
        if (abgabeBestaetigt) {
            notifyWerkstattUsers(auftrag)
        }

        return aktualisierterAuftrag
    }

    private fun notifyWerkstattUsers(auftrag: Auftrag) {
        // Hier wird die Liste der "Werkstatt"-Benutzer abgerufen
        val werkstattUsers = listOf(
            User(3, "Werkstatt", "Hans", "Günther", "hans.guenther+1@inbox.mailtrap.io", "password123"),
            User(4, "Werkstatt", "Olli", "Pocher", "olli.pocher+1@inbox.mailtrap.io", "password123")
        )

        // Sende E-Mails an alle "Werkstatt"-Benutzer
        werkstattUsers.forEach { user ->
            emailService.sendEmail(
                user.email,
                "Abgabe bestätigt: Auftrag ID ${auftrag.auftragId}",
                "Die Abgabe des Auftrags mit der ID ${auftrag.auftragId} wurde bestätigt."
            )
        }
    }

}
