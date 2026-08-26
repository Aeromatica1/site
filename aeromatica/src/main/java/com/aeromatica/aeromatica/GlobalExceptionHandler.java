package com.aeromatica.aeromatica;

import com.aeromatica.aeromatica.dto.ExceptionResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionResponse> handleValidacao(MethodArgumentNotValidException error) {
        Map<String, String> erros = new HashMap<>();
        error.getBindingResult().getFieldErrors()
                .forEach(erro -> erros.put(erro.getField(), erro.getDefaultMessage()));
        ExceptionResponse response = new ExceptionResponse(HttpStatus.BAD_REQUEST.value(), "Dados inválidos", erros);
        return ResponseEntity.badRequest().body(response);
    }
}
