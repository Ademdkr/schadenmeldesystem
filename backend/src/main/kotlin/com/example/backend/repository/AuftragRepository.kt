package org.example.backend.repository

import org.example.backend.model.Auftrag
import org.springframework.data.jpa.repository.JpaRepository

interface AuftragRepository : JpaRepository<Auftrag, Long>
