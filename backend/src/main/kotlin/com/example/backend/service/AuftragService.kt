package com.example.backend.service

import com.example.backend.model.Auftrag
import com.example.backend.repository.AuftragRepository
import org.springframework.stereotype.Service
import java.time.LocalDateTime

@Service
class AuftragService(
    private val repository: AuftragRepository,
) {

    fun findAll(): List<Auftrag> = repository.findAll()

    fun save(auftrag: Auftrag): Auftrag = repository.save(auftrag)

    fun deleteById(id: Long) = repository.deleteById(id)

    fun getAuftraegeByStatus(status: String): List<Auftrag> {
        return repository.findByStatus(status)
    }

    fun findById(id: Long): Auftrag? = repository.findById(id).orElse(null)

    fun updateStatus(
        id: Long,
        status: String,
        abgabeOrt: String?,
        abgabeDatum: String?,
        abgabeBestaetigt: Boolean?,
        reparaturStart: String?,
        reparaturEnde: String?
    ): Auftrag {
        val auftrag = repository.findById(id).orElseThrow { IllegalArgumentException("Auftrag not found") }
        auftrag.status = status
        if (abgabeOrt != null) auftrag.abgabeOrt = abgabeOrt
        if (abgabeDatum != null) auftrag.abgabeDatum = abgabeDatum
        if (abgabeBestaetigt != null) auftrag.abgabeBestaetigt = abgabeBestaetigt
        if (reparaturStart != null) auftrag.reparaturStart = reparaturStart
        if (reparaturEnde != null) auftrag.reparaturEnde = reparaturEnde


        return repository.save(auftrag)
    }

    fun updateAbgabeBestaetigt(id: Long, abgabeBestaetigt: Boolean): Auftrag {
        val auftrag = repository.findById(id).orElseThrow { IllegalArgumentException("Auftrag not found") }

        if (auftrag.abgabeBestaetigt == true) {
            throw IllegalStateException("Abgabe wurde bereits bestätigt und kann nicht erneut geändert werden.")
        }

        auftrag.abgabeBestaetigt = abgabeBestaetigt
        return repository.save(auftrag)
    }
}
