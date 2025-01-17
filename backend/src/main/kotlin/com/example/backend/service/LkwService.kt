package com.example.backend.service

import com.example.backend.model.Lkw
import com.example.backend.repository.LkwRepository
import org.springframework.stereotype.Service

@Service
class LkwService(private val lkwRepository: LkwRepository) {

    /*    fun getAllLkws(): List<Lkw> {
            return lkwRepository.findAll()
        }

        fun getLkwById(id: Long): Lkw? {
            return lkwRepository.findById(id).orElse(null)
        }

        fun createLkw(lkw: Lkw): Lkw {
            return lkwRepository.save(lkw)
        }

        fun deleteLkwById(id: Long) {
            lkwRepository.deleteById(id)
        }*/
}
