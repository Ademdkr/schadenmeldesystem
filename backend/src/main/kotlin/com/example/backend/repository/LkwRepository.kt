package com.example.backend.repository

import com.example.backend.model.Lkw
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface LkwRepository : JpaRepository<Lkw, Long> {
    fun findByKennzeichen(kennzeichen: String): Lkw?
}
