package com.example.backend.controller

import com.example.backend.model.Auftrag
import com.example.backend.service.AuftragService
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/auftraege")
class AuftragController(private val service: AuftragService) {

    @PostMapping
    fun create(@RequestBody auftrag: Auftrag): Auftrag = service.save(auftrag)

    @GetMapping("/{id}")
    fun getById(@PathVariable id: Long): Auftrag? = service.findById(id)

    @GetMapping("/status/{status}")
    fun getAuftraegeByStatus(@PathVariable status: String): List<Auftrag> {
        val translatedStatus = when (status) {
            "offen" -> "Offen"
            "terminiert" -> "Terminiert"
            "in-bearbeitung" -> "In Bearbeitung"
            "abgeschlossen" -> "Abgeschlossen"
            else -> throw IllegalArgumentException("Unbekannter Status: $status")
        }
        return service.getAuftraegeByStatus(translatedStatus)
    }

    @PatchMapping("/{id}")
    fun updateAuftrag(@PathVariable id: Long, @RequestBody updates: Map<String, Any?>): Auftrag =
        service.updateAuftrag(id, updates)

    // Exception Handler für IllegalArgumentException
    @ExceptionHandler(IllegalArgumentException::class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    fun handleIllegalArgumentException(ex: IllegalArgumentException): Map<String, String> {
        return mapOf("error" to ex.message!!)
    }
}
