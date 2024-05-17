package com.quadrart.Storage;

/*
 * Cria exceções que podem ser utilizadas no Storage Service
 */
public class StorageFileNotFoundException extends StorageException {

    public StorageFileNotFoundException(String message){
        super(message);
    }

    public StorageFileNotFoundException(String message, Throwable cause){
        super(message, cause);
    }
}
