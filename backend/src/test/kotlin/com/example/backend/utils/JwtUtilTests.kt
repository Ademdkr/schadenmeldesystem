package com.example.backend.utils

import io.jsonwebtoken.Jwts
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import java.util.*

class JwtUtilTests {

    @Test
    fun `generateToken should produce a valid token`() {
        val token = JwtUtil.generateToken(1, "test@example.com", "Max", "Mustermann", "Fahrer")
        assertNotNull(token)
        assertTrue(token.isNotEmpty())

        // Zum Testen parsen wir den Token, um sicherzustellen, dass die Claims enthalten sind.
        // Hinweis: Da der Schlüssel in JwtUtil nicht öffentlich ist, ist ein vollständiger Parsing-Test hier
        // nur eingeschränkt möglich. Wir prüfen aber zumindest, dass ein Subject vorhanden ist.
        val body = Jwts.parserBuilder()
            .setSigningKey(JwtUtilTestHelper.getKeyFromJwtUtil())
            .build()
            .parseClaimsJws(token)
            .body

        assertEquals("test@example.com", body.subject)
        assertEquals(1, (body["id"] as Int))
    }
}

/**
 * Hilfsklasse, um den geheimen Schlüssel aus JwtUtil zu extrahieren.
 * Da JwtUtil den Schlüssel intern generiert, muss hier (zum Testen) eventuell der gleiche Mechanismus
 * verwendet oder der Schlüssel injiziert werden.
 *
 * Im vorliegenden Beispiel simulieren wir den Zugriff; in einer realen Testumgebung solltest du den Schlüssel
 * via Konfiguration injizieren.
 */
object JwtUtilTestHelper {
    fun getKeyFromJwtUtil() = JwtUtil.javaClass.getDeclaredField("key").apply {
        isAccessible = true
    }.get(JwtUtil) as java.security.Key
}
