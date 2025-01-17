plugins {
	java
	id("org.springframework.boot") version "3.4.1"
	id("io.spring.dependency-management") version "1.1.7"
}

group = "org.example"
version = "0.0.1-SNAPSHOT"

java {
	toolchain {
		languageVersion = JavaLanguageVersion.of(17)
	}
}

repositories {
	mavenCentral()
}

dependencies {
	// Spring Web Starter
	implementation("org.springframework.boot:spring-boot-starter-web")

	// Spring Data JPA
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")

	// SQLite JDBC Driver
	implementation("org.xerial:sqlite-jdbc:3.41.2.1")

	// Development tools
	developmentOnly("org.springframework.boot:spring-boot-devtools")

	// Test dependencies
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

tasks.withType<Test> {
	useJUnitPlatform()
}
