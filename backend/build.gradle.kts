import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    id("org.springframework.boot") version "3.1.2"
    id("io.spring.dependency-management") version "1.1.0"
    kotlin("jvm") version "1.8.21"
    id("org.jlleitschuh.gradle.ktlint") version "11.6.0"
    kotlin("plugin.spring") version "1.8.21"
    kotlin("plugin.jpa") version "1.8.21"
}

group = "com.example"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_17

repositories {
    mavenCentral()
}

dependencies {
    // Spring Boot Starter für Web-Anwendungen (REST Controller, etc.)
    implementation("org.springframework.boot:spring-boot-starter-web")
    // Spring Boot Starter für JPA (inkl. Jakarta Persistence API)
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    // Starter für das Versenden von E-Mails
    implementation("org.springframework.boot:spring-boot-starter-mail")

    // Kotlin-spezifische Abhängigkeiten
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")

    // JSON Web Token (JWT) Unterstützung
    implementation("io.jsonwebtoken:jjwt-api:0.11.5")
    runtimeOnly("io.jsonwebtoken:jjwt-impl:0.11.5")
    runtimeOnly("io.jsonwebtoken:jjwt-jackson:0.11.5")

    implementation("org.postgresql:postgresql:42.7.2") // Add PostgreSQL driver dependency here

    // Datenbank: H2 als In-Memory-Lösung (nützlich für Tests und Entwicklung)
    runtimeOnly("com.h2database:h2")

    // Test-Abhängigkeiten
    testImplementation("org.springframework.boot:spring-boot-starter-test") {
        // Falls du die Standard-Mockito-Abhängigkeit nicht verwenden möchtest,
        // kannst du diese hier ausschließen, da wir zusätzlich MockK einbinden.
        exclude(module = "mockito-core")
    }
    // JUnit 5 API und Engine (wird von Spring Boot Starter Test meist bereits transitiv eingebunden)
    testImplementation("org.junit.jupiter:junit-jupiter-api")
    testRuntimeOnly("org.junit.jupiter:junit-jupiter-engine")
    // Mocking: Wir nutzen sowohl MockK als auch Mockito (je nach Test)
    testImplementation("io.mockk:mockk:1.13.5")
    testImplementation("org.mockito:mockito-core:5.2.0")
    testImplementation("org.mockito.kotlin:mockito-kotlin:4.1.0")
    testImplementation(kotlin("test"))
}

tasks.withType<Test> {
    useJUnitPlatform()
}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs = listOf("-Xjsr305=strict")
        jvmTarget = "17"
    }
}
