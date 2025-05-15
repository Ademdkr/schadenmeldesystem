package com.example.backend.model

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id

@Entity
data class Lkw(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0, // Auto-generierte ID

    val kennzeichen: String = "",
    val vin: String = "",
    val marke: String = "",
    val modell: String = "",
    val baujahr: Int = 0
)
