package com.quadrart.Handlers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.quadrart.Storage.StorageException;
import com.quadrart.Storage.StorageFileNotFoundException;

/*
 * Este abaixo é um controlador de erros, que faz tratamento de alguns erros
 * especificos que podem ocorrer nos controladores.
 * 
 * Essa classe é só um exemplo, e não está bem estruturada para dar conta
 * de todas os possíveis erros gerados.
 * 
 * Em casos de erros não tratados, durante uma requisição, cada um erro
 * seja jogado, o comportamento do string é retornar uma resposta 403.
 */
@RestControllerAdvice
public class GlobalErrorHandler {

    @ExceptionHandler(StorageException.class)
    public ResponseEntity<?> handleException(StorageException exception){
        return ResponseEntity.badRequest().body(exception.getMessage());
    }

    @ExceptionHandler(StorageFileNotFoundException.class)
    public ResponseEntity<?> handleException(StorageFileNotFoundException exception){
        return ResponseEntity.badRequest().body(exception.getMessage());
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<?> handleException(Exception exception){
        return ResponseEntity.badRequest().body(exception.getMessage());
    }

}
