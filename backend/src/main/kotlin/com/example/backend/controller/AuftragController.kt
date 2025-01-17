package org.example.backend.controller

import org.example.backend.model.Auftrag
import org.example.backend.service.AuftragService
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
}
