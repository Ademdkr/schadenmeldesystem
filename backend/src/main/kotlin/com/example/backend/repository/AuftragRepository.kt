package com.example.backend.repository

import com.example.backend.model.Auftrag
import org.springframework.data.jpa.repository.JpaRepository

interface AuftragRepository : JpaRepository<Auftrag, Long>
