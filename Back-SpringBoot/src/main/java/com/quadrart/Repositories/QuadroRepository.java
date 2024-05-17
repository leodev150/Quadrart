package com.quadrart.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.quadrart.Models.Quadro.Quadro;

/*
 * Interface repositório, que extende, JpaRepository. Essencialmente
 * permite uma integração dos models e MySQL. Permite o manuseio de uma
 * tabela criada dedicada ao objeto Modelo Quadro.
 */

@Repository
public interface QuadroRepository extends JpaRepository<Quadro, Long> {
    
}
