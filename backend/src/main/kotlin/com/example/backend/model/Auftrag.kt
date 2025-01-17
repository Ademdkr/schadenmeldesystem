package com.example.backend.model

import jakarta.persistence.*
import java.time.LocalDate

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
    val erstelltAm: LocalDate,

    var vin: String? = null,
    var marke: String? = null,
    var modell: String? = null,
    var baujahr: Int? = null,
    val rolle: String? = null,
    val erstelltVon: String? = null,
    val email: String? = null,
    val status: String? = null,
    val abgabeOrt: String? = null,
    val abgabeDatum: LocalDate? = null,
    val abgabeTermin: String? = null,
    val abgabeBestaetigt: Boolean? = null,
    val bearbeiter: String? = null,
    val bearbeiterEmail: String? = null,
    val reparaturStart: LocalDate? = null,
    val reparaturEnde: LocalDate? = null
) {
    // Hibernate benötigt einen No-Arg-Konstruktor
    constructor() : this(
        auftragId = 0,
        kennzeichen = "",
        beschreibung = "",
        fahrtuechtig = false,
        standort = "",
        erstelltAm = LocalDate.now(),
    )
}
