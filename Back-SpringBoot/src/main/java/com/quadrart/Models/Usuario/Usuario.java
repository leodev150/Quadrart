package com.quadrart.Models.Usuario;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.quadrart.Models.Quadro.Quadro;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "usuarios")
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Usuario implements UserDetails {

    public Usuario(RequestUsuarioRegistro usuario){
        this.nome = usuario.nome();
        this.username = usuario.username();
        this.email = usuario.email();
        this.senha = usuario.senha();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="nome")
    private String nome;

    @Column(name="username", unique = true)
    private String username;

    @Column(name="email", unique = true)
    private String email;

    @Column(name="senha")
    private String senha;

    @OneToMany
    @JoinColumn(name = "usuario_id", referencedColumnName = "id")
    private List<Quadro> quadrosCriados = new ArrayList<Quadro>();

    public void addQuadrosCriados(Quadro quadro) {
        quadrosCriados.add(quadro);
    }
    public List<Quadro> getQuadrosCriados(){
        return this.quadrosCriados;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getPassword() {
        return senha;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
