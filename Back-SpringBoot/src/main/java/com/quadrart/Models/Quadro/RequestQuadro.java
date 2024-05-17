package com.quadrart.Models.Quadro;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.web.multipart.MultipartFile;

/*
 * Modelo para receber uma requisição de criação de quadro e atualização de quadro.
 * - Contém tags de verifição para sem utilizados pelo @Valid.
 * Exemplos:
 * - @NotBlank
 * - @Size 
 */
public record RequestQuadro(
        @NotBlank
        @Size(min=1, max=32)
        String nomeArtista,

        @NotBlank
        @Size(min=1, max=40)
        String nomeAlbum,

        long ano,

        @NotBlank
        @Size(min=3, max=20)
        String genero,

        @Max(999)
        Long duracao,

        MultipartFile file
        ) {

}
