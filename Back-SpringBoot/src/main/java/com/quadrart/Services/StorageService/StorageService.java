package com.quadrart.Services.StorageService;

import java.util.stream.Stream;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;

/*
 * Interface de serviço Storage. Onde é definido
 * as funções que serão implementadas de forma obrigatória.
 */
public interface StorageService {
    void init();

    void store(MultipartFile file, String filename);

    Stream<Path> loadAll();

    Path load(String filename);

    Resource loadAsResource(String filename);

    void delete(String filename);

    void deleteAll();
}
