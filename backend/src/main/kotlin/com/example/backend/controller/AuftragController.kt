package com.example.backend.controller

import com.example.backend.model.Auftrag
import com.example.backend.service.AuftragService
import org.springframework.web.bind.annotation.*
import java.time.LocalDate
import java.time.LocalDateTime

@RestController
@RequestMapping("/api/auftraege")
class AuftragController(private val service: AuftragService) {

    @GetMapping
    fun getAll(): List<Auftrag> = service.findAll()

    @PostMapping
    fun create(@RequestBody auftrag: Auftrag): Auftrag = service.save(auftrag)

    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: Long) = service.deleteById(id)

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
    fun updateStatus(
        @PathVariable id: Long,
        @RequestBody body: Map<String, Any>
    ): Auftrag {
        val status = body["status"] as? String ?: throw IllegalArgumentException("Status is required")
        val abgabeOrt = body["abgabeOrt"] as? String
        val abgabeDatum = body["abgabeDatum"] as? String
        val reparaturStart = body["reparaturStart"] as? String
        val reparaturEnde = body["reparaturEnde"] as? String

        return service.updateStatus(id, status, abgabeOrt, abgabeDatum, reparaturStart, reparaturEnde)
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
