package com.devsuperior.dscatalog.service.validation;

import java.util.ArrayList;
import java.util.List;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import com.devsuperior.dscatalog.dto.UsuarioNovoDTO;
import com.devsuperior.dscatalog.model.Usuario;
import com.devsuperior.dscatalog.repository.UsuarioRepository;
import com.devsuperior.dscatalog.resource.exception.FieldMessage;

public class UsuarioNovoValidator implements ConstraintValidator<UsuarioNovo, UsuarioNovoDTO> {

	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Override
	public void initialize(UsuarioNovo constraintAnnotation) {}

	@Override
	public boolean isValid(UsuarioNovoDTO usuarioNovoDTO, ConstraintValidatorContext context) {

		List<FieldMessage> lista = new ArrayList<>();
		
		Usuario usuario = usuarioRepository.findByEmail(usuarioNovoDTO.getEmail());
		
		if (usuario != null) {
			lista.add(new FieldMessage("email", "e-Mail já existente"));
		}
		
		for (FieldMessage e : lista) {
			context.disableDefaultConstraintViolation();
			context.buildConstraintViolationWithTemplate(e.getMessage()).addPropertyNode(e.getFieldName())
					.addConstraintViolation();
		}
		
		return lista.isEmpty();
	}

}
