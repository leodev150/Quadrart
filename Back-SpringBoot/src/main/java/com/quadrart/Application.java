package com.quadrart;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;

import com.quadrart.Services.StorageService.StorageService;
import com.quadrart.Storage.StorageProperties;

/*
 * Arquivo de aplicação inicial do backend.
 * Nele há funções que devem ser executas logo no ínicio do boot do back.
 */
@EnableConfigurationProperties(StorageProperties.class)
@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}


	/*
	 * Cria uma pasta onde as imagens serão armazenadas no boot da aplicação
	 */
	@Bean
	CommandLineRunner init(StorageService storageService) {
		return (args) -> {
			storageService.init();
		};
	}
}
