package com.devsuperior.dscatalog.resource.exception;

import java.time.Instant;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.devsuperior.dscatalog.service.exception.ObjectNotFoundException;

@ControllerAdvice
public class ResourceExceptionHandler {

	@ExceptionHandler(ObjectNotFoundException.class)
	public ResponseEntity<StandardError> objectNotFound(ObjectNotFoundException o, HttpServletRequest request) {
		
		StandardError error = new StandardError(Instant.now(), HttpStatus.NOT_FOUND.value(), "Recurso Não Encontrado", o.getMessage(), request.getRequestURI()); 
		
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
		
	}
	
}
