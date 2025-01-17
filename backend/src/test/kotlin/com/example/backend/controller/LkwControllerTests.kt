package com.example.backend.controller

import com.example.backend.model.Lkw
import com.example.backend.repository.LkwRepository
import com.example.backend.service.LkwService
import com.fasterxml.jackson.databind.ObjectMapper
import org.junit.jupiter.api.Test
import org.mockito.Mockito
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*

@WebMvcTest(LkwController::class)
class LkwControllerTests {

    @Autowired
    lateinit var mockMvc: MockMvc

    @MockBean
    lateinit var lkwService: LkwService

    @MockBean
    lateinit var lkwRepository: LkwRepository

    @Autowired
    lateinit var objectMapper: ObjectMapper

    /*@Test
    fun `GET getAllLkws should return list of Lkws`() {
        val lkws = listOf(
            Lkw(id = 1, kennzeichen = "KA-001", vin = "VIN001", marke = "MarkeA", modell = "ModellA", baujahr = 2010)
        )
        Mockito.`when`(lkwService.getAllLkws()).thenReturn(lkws)

        mockMvc.perform(get("/api/lkw"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$[0].kennzeichen").value("KA-001"))
    }

    @Test
    fun `GET getLkwById should return a Lkw when found`() {
        val lkw = Lkw(id = 2, kennzeichen = "KA-002", vin = "VIN002", marke = "MarkeB", modell = "ModellB", baujahr = 2012)
        Mockito.`when`(lkwService.getLkwById(2)).thenReturn(lkw)

        mockMvc.perform(get("/api/lkw/2"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.kennzeichen").value("KA-002"))
    }

    @Test
    fun `POST createLkw should create and return a new Lkw`() {
        val lkw = Lkw(kennzeichen = "KA-003", vin = "VIN003", marke = "MarkeC", modell = "ModellC", baujahr = 2015)
        Mockito.`when`(lkwService.createLkw(Mockito.any(Lkw::class.java))).thenReturn(lkw)

        mockMvc.perform(
            post("/api/lkw")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(lkw))
        )
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.kennzeichen").value("KA-003"))
    }

    @Test
    fun `DELETE deleteLkwById should return 200`() {
        Mockito.doNothing().`when`(lkwService).deleteLkwById(1)

        mockMvc.perform(delete("/api/lkw/1"))
            .andExpect(status().isOk)
    }*/

    @Test
    fun `GET getLkwByKennzeichen should return Lkw if found`() {
        val lkw = Lkw(id = 4, kennzeichen = "KA-004", vin = "VIN004", marke = "MarkeD", modell = "ModellD", baujahr = 2018)
        Mockito.`when`(lkwRepository.findByKennzeichen("KA-004")).thenReturn(lkw)

        mockMvc.perform(get("/api/lkw/kennzeichen/KA-004"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.kennzeichen").value("KA-004"))
    }

    @Test
    fun `GET getLkwByKennzeichen should return 404 if not found`() {
        Mockito.`when`(lkwRepository.findByKennzeichen("UNKNOWN")).thenReturn(null)

        mockMvc.perform(get("/api/lkw/kennzeichen/UNKNOWN"))
            .andExpect(status().isNotFound)
    }
}
