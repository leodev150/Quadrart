package com.quadrart.Models.Usuario;

import jakarta.validation.constraints.NotBlank;

public record RequestUsuarioLogin (
    
    @NotBlank
    String login,

    @NotBlank
    String senha

    ) {
    
}
