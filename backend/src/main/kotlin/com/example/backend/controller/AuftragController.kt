package com.example.backend.controller

import com.example.backend.model.Auftrag
import com.example.backend.service.AuftragService
import org.springframework.web.bind.annotation.*

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
}
