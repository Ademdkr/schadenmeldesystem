package com.example.backend.service

import com.example.backend.model.Lkw
import com.example.backend.repository.LkwRepository
import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import java.util.*

class LkwServiceTests {

    private val lkwRepository = mockk<LkwRepository>()
    private val service = LkwService(lkwRepository)

    /*@Test
    fun `getAllLkws should return list from repository`() {
        val lkwList = listOf(
            Lkw(id = 1, kennzeichen = "KA-001", vin = "VIN001", marke = "MarkeA", modell = "ModellA", baujahr = 2010),
            Lkw(id = 2, kennzeichen = "KA-002", vin = "VIN002", marke = "MarkeB", modell = "ModellB", baujahr = 2012)
        )
        every { lkwRepository.findAll() } returns lkwList

        val result = service.getAllLkws()

        verify { lkwRepository.findAll() }
        assertEquals(2, result.size)
    }

    @Test
    fun `getLkwById should return Lkw when found`() {
        val lkw = Lkw(id = 1, kennzeichen = "KA-001", vin = "VIN001", marke = "MarkeA", modell = "ModellA", baujahr = 2010)
        every { lkwRepository.findById(1) } returns Optional.of(lkw)

        val result = service.getLkwById(1)

        verify { lkwRepository.findById(1) }
        assertNotNull(result)
        assertEquals("KA-001", result?.kennzeichen)
    }

    @Test
    fun `createLkw should save and return new Lkw`() {
        val lkw = Lkw(kennzeichen = "KA-003", vin = "VIN003", marke = "MarkeC", modell = "ModellC", baujahr = 2015)
        every { lkwRepository.save(lkw) } returns lkw

        val result = service.createLkw(lkw)

        verify { lkwRepository.save(lkw) }
        assertEquals("KA-003", result.kennzeichen)
    }

    @Test
    fun `deleteLkwById should call repository deleteById`() {
        every { lkwRepository.deleteById(1) } returns Unit

        service.deleteLkwById(1)

        verify { lkwRepository.deleteById(1) }
    }*/
}
