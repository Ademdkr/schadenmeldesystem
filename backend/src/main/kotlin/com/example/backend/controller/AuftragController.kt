package com.example.backend.controller

import com.example.backend.model.Auftrag
import com.example.backend.service.AuftragService
import com.example.backend.service.EmailService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/auftraege")
class AuftragController(
    private val service: AuftragService,
    private val emailService: EmailService
) {

    @PostMapping
    fun create(@RequestBody auftrag: Auftrag): Auftrag {
        val neuerAuftrag = service.save(auftrag)
        // E-Mail senden, wenn ein Auftrag erstellt wurde
        auftrag.email?.let {
            emailService.sendEmail(
                it,
                "Bestätigung: Auftrag erstellt",
                "Ihr Auftrag mit der ID ${neuerAuftrag.auftragId} wurde erfolgreich erstellt."
            )
        }
        return neuerAuftrag
    }


    @GetMapping("/offen")
    fun getOffeneAuftraege(): List<Auftrag> {
        return service.getAuftraegeByStatus("Offen")
    }

    @GetMapping("/terminiert")
    fun getTerminierteAuftraege(): List<Auftrag> {
        return service.getAuftraegeByStatus("Terminiert")
    }

    @GetMapping("/in-bearbeitung")
    fun getInBearbeitungAuftraege(): List<Auftrag> {
        return service.getAuftraegeByStatus("In Bearbeitung")
    }

    @GetMapping("/abgeschlossen")
    fun getAbgeschlosseneAuftraege(): List<Auftrag> {
        return service.getAuftraegeByStatus("Abgeschlossen")
    }

    @GetMapping("/{id}")
    fun getById(@PathVariable id: Long): Auftrag? = service.findById(id)

    @PatchMapping("/{id}/status")
    fun updateAuftrag(
        @PathVariable id: Long,
        @RequestBody body: Map<String, Any>
    ): Auftrag {
        val status = body["status"] as? String ?: throw IllegalArgumentException("Status is required")
        val abgabeOrt = body["abgabeOrt"] as? String
        val abgabeDatum = body["abgabeDatum"] as? String
        val abgabeBestaetigt = body["abgabeBestaetigt"] as? Boolean?
        val reparaturStart = body["reparaturStart"] as? String
        val reparaturEnde = body["reparaturEnde"] as? String
        val bearbeiter = body["bearbeiter"] as? String
        val bearbeiterEmail = body["bearbeiterEmail"] as? String

        return service.updateAuftrag(
            id,
            status,
            abgabeOrt,
            abgabeDatum,
            abgabeBestaetigt,
            reparaturStart,
            reparaturEnde,
            bearbeiter,
            bearbeiterEmail
        )
    }

    @PatchMapping("/{id}/abgabe-bestaetigen")
    fun updateAbgabeBestaetigt(
        @PathVariable id: Long,
        @RequestBody body: Map<String, Any>
    ): Auftrag {
        val abgabeBestaetigt = body["abgabeBestaetigt"] as? Boolean
            ?: throw IllegalArgumentException("abgabeBestaetigt is required and must be a boolean")

        return service.updateAbgabeBestaetigt(id, abgabeBestaetigt)
    }
}
