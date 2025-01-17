package org.example.backend.service

import org.example.backend.model.Auftrag
import org.example.backend.repository.AuftragRepository
import org.springframework.stereotype.Service

@Service
class AuftragService(private val repository: AuftragRepository) {

    fun findAll(): List<Auftrag> = repository.findAll()

    fun save(auftrag: Auftrag): Auftrag = repository.save(auftrag)

    fun deleteById(id: Long) = repository.deleteById(id)
}
