package com.quadrart.Services.UsuarioService;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.quadrart.Models.Usuario.Usuario;
import com.quadrart.Repositories.UsuarioRepository;

import lombok.RequiredArgsConstructor;

/*
 * Serviço responsável por criar um toolset para 
 * buscar, criar, editar e deletar usuários.
 */
@Service
@RequiredArgsConstructor
public class UsuarioServiceImpl implements UsuarioService {
    
    /*
     * UsuarioRepository para se ter acesso a funções
     * que interagem com a base de dados.
     * 
     */
    private final UsuarioRepository usuarioRepository;

    /*
     * Recebe um username e carrega um usuário com
     * esse username;
     */
    @Override
    public Usuario loadUserByUsername(String username) {
            return usuarioRepository.findByUsername(username);
        
    }

    /*
     * Recebe um e-mail, e carrega um usuário com esse
     * e-mail
     */
    @Override
    public Usuario loadUserByEmail(String email){
        return usuarioRepository.findByEmail(email);
    }

    /*
     * Recebe um usuário, e cria um usuário.
     */
    @Override
    public Usuario createUser(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    /*
     * Recebe um id, e deleta um usuário de dado ID.
     */
    @Override
    public String deleteUser(Long id){
        usuarioRepository.deleteById(id);
        return "O usuário de ID: %s foi deletado".formatted(id);
    }

    @Override
    public Usuario updateUser(Usuario usuario) {
        Usuario user = usuarioRepository.findByUsername(usuario.getUsername());
        if (user != null){
            return usuarioRepository.save(user);
        } else {
            return user;
        }
    }
    
}
