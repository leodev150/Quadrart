package com.quadrart.Services.UsuarioService;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.quadrart.Models.Usuario.Usuario;

/*
 * Interface de serviço Usuario. Onde é definido
 * as funções que serão implementadas de forma obrigatória.
 */
public interface UsuarioService extends UserDetailsService{
    Usuario loadUserByUsername(String username);

    Usuario loadUserByEmail(String email);

    Usuario createUser(Usuario usuario);

    String deleteUser(Long Id);

    Usuario updateUser(Usuario usuario);
}
