package com.quadrart.Models.Quadro;

import java.util.ArrayList;
import java.util.List;

import com.quadrart.Models.Usuario.Usuario;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

/*
 * Classe que representa um quadro na base de dados.
 * @Data cria setters e getters automaticamente para todos os parametros
 */
@Data
@Entity
@Table(name = "quadros")
@NoArgsConstructor
public class Quadro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nome_artista")
    private String nomeArtista;

    @Column(name = "nome_album")
    private String nomeAlbum;

    @Column(name = "ano")
    private long ano;

    @Column(name = "duracao")
    private Long duracao;

    @Column(name = "genero")
    private String genero;

    @Column(name = "imagem")
    private String imagem;

    public Quadro(RequestQuadro requestQuadro){
        this.nomeArtista = requestQuadro.nomeArtista();
        this.nomeAlbum = requestQuadro.nomeAlbum();
        this.ano = requestQuadro.ano();
        this.genero = requestQuadro.genero();
        this.duracao = requestQuadro.duracao();
        this.imagem = "";
    }


}
