package com.example.backend.controller

import com.example.backend.model.Auftrag
import com.example.backend.service.AuftragService
import com.fasterxml.jackson.databind.ObjectMapper
import org.junit.jupiter.api.Test
import org.mockito.kotlin.any
import org.mockito.kotlin.whenever
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*

@WebMvcTest(AuftragController::class)
class AuftragControllerTests {

    @Autowired
    lateinit var mockMvc: MockMvc

    @MockBean
    lateinit var service: AuftragService

    @Autowired
    lateinit var objectMapper: ObjectMapper

    @Test
    fun `POST create should return created Auftrag`() {
        val auftrag = Auftrag(
            auftragId = 1,
            kennzeichen = "XY-999",
            beschreibung = "Neuer Auftrag",
            fahrtuechtig = true,
            standort = "TestStandort"
        )
        // Verwende whenever und any() von mockito-kotlin
        whenever(service.save(any())).thenReturn(auftrag)

        mockMvc.perform(
            post("/api/auftraege")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(auftrag))
        )
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.auftragId").value(1))
            .andExpect(jsonPath("$.kennzeichen").value("XY-999"))
    }

    @Test
    fun `GET getById should return Auftrag when found`() {
        val auftrag = Auftrag(
            auftragId = 2,
            kennzeichen = "ZZ-123",
            beschreibung = "Auftrag Test",
            fahrtuechtig = false,
            standort = "TestStandort2"
        )
        whenever(service.findById(2)).thenReturn(auftrag)

        mockMvc.perform(get("/api/auftraege/2"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.auftragId").value(2))
    }

    @Test
    fun `GET getAuftraegeByStatus should translate status and return list`() {
        val auftrag = Auftrag(
            auftragId = 3,
            kennzeichen = "AA-111",
            beschreibung = "Status Test",
            fahrtuechtig = true,
            standort = "TestStandort3",
            status = "Offen"
        )
        whenever(service.getAuftraegeByStatus("Offen")).thenReturn(listOf(auftrag))

        mockMvc.perform(get("/api/auftraege/status/offen"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$[0].auftragId").value(3))
    }

    @Test
    fun `PATCH updateAuftrag should return updated Auftrag`() {
        val auftrag = Auftrag(
            auftragId = 4,
            kennzeichen = "BB-222",
            beschreibung = "Update Test",
            fahrtuechtig = false,
            standort = "TestStandort4",
            status = "Offen"
        )
        val updates = mapOf("status" to "Abgeschlossen")
        val updatedAuftrag = auftrag.copy(status = "Abgeschlossen")
        whenever(service.updateAuftrag(4, updates)).thenReturn(updatedAuftrag)

        mockMvc.perform(
            patch("/api/auftraege/4")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updates))
        )
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.status").value("Abgeschlossen"))
    }

    @Test
    fun `GET getAuftraegeByStatus with unknown status should return error`() {
        mockMvc.perform(get("/api/auftraege/status/unknown"))
            .andExpect(status().isBadRequest)
    }
}
