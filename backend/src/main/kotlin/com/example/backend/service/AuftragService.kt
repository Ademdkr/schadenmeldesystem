package com.example.backend.service

import com.example.backend.model.Auftrag
import com.example.backend.repository.AuftragRepository
import org.springframework.stereotype.Service

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
}
