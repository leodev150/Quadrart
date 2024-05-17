package com.quadrart.Models.Usuario;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RequestUsuarioRegistro (

    @NotBlank
    @Size(min=1, max=60)
    String nome,

    
    @NotBlank
    @Size(min=6, max=60)
    String username,

    @NotBlank
    @Email
    String email,

    @NotBlank
    @Size(min=6, max=60)
    String senha
) {
    
}
