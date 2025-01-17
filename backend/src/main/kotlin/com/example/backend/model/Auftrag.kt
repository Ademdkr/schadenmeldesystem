package com.example.backend.model

import jakarta.persistence.*
import java.time.LocalDate
import java.time.LocalDateTime

@Entity
@Table(name = "auftrag")
data class Auftrag(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val auftragId: Long = 0,

    @Column(nullable = false)
    val kennzeichen: String,

    @Column(nullable = false)
    val beschreibung: String,

    @Column(nullable = false)
    val fahrtuechtig: Boolean,

    @Column(nullable = false)
    val standort: String,

    @Column(nullable = false)
    val erstelltAm: LocalDateTime = LocalDateTime.now(),

    var vin: String? = null,
    var marke: String? = null,
    var modell: String? = null,
    var baujahr: Int? = null,
    val rolle: String? = null,
    val erstelltVon: String? = null,
    val email: String? = null,
    var status: String? = null,
    var abgabeOrt: String? = null,
    var abgabeDatum: String? = null,
    var abgabeBestaetigt: Boolean? = null,
    var bearbeiter: String? = null,
    var bearbeiterEmail: String? = null,
    var reparaturStart: String? = null,
    var reparaturEnde: String? = null
) {
    // Hibernate benötigt einen No-Arg-Konstruktor
    constructor() : this(
        auftragId = 0,
        kennzeichen = "",
        beschreibung = "",
        fahrtuechtig = false,
        standort = "",
        erstelltAm = LocalDateTime.now(),
    )
}
