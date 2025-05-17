package com.example.backend.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
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
    var rolle: String? = null,
    var erstelltVon: String? = null,
    var email: String? = null,
    var status: String? = null,
    var abgabeOrt: String? = null,
    var abgabeDatum: String? = null,
    var abgabeBestaetigt: Boolean? = null,
    var bearbeiter: String? = null,
    var bearbeiterEmail: String? = null,
    var reparaturStart: String? = null,
    var reparaturEnde: String? = null
) {
    constructor() : this(0, "", "", false, "")
}
