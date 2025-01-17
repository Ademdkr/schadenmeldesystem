package com.example.backend.model

import jakarta.persistence.*

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
