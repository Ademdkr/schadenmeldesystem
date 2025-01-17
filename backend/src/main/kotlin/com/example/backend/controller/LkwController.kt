package com.example.backend.controller

import com.example.backend.model.Lkw
import com.example.backend.repository.LkwRepository
import com.example.backend.service.LkwService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/lkw")
class LkwController(
    private val lkwService: LkwService,
    private val lkwRepository: LkwRepository
) {

    @GetMapping
    fun getAllLkws(): List<Lkw> {
        return lkwService.getAllLkws()
    }

    @GetMapping("/{id}")
    fun getLkwById(@PathVariable id: Long): Lkw? {
        return lkwService.getLkwById(id)
    }

    @PostMapping
    fun createLkw(@RequestBody lkw: Lkw): Lkw {
        return lkwService.createLkw(lkw)
    }

    @DeleteMapping("/{id}")
    fun deleteLkw(@PathVariable id: Long) {
        lkwService.deleteLkwById(id)
    }

    @GetMapping("/kennzeichen/{kennzeichen}")
    fun getLkwByKennzeichen(@PathVariable kennzeichen: String): ResponseEntity<Lkw> {
        val lkw = lkwRepository.findByKennzeichen(kennzeichen)
        return if (lkw != null) {
            ResponseEntity.ok(lkw)
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND).build()
        }
    }
}