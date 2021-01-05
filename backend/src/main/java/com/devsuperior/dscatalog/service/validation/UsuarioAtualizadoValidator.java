package com.devsuperior.dscatalog.service.validation;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerMapping;

import com.devsuperior.dscatalog.dto.UsuarioAtualizadoDTO;
import com.devsuperior.dscatalog.model.Usuario;
import com.devsuperior.dscatalog.repository.UsuarioRepository;
import com.devsuperior.dscatalog.resource.exception.FieldMessage;

public class UsuarioAtualizadoValidator implements ConstraintValidator<UsuarioAtualizado, UsuarioAtualizadoDTO> {

	@Autowired
	private HttpServletRequest request;
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Override
	public void initialize(UsuarioAtualizado constraintAnnotation) {}

	@Override
	public boolean isValid(UsuarioAtualizadoDTO dto, ConstraintValidatorContext context) {
		
		@SuppressWarnings("unchecked")
		Map<String, String> map = (Map<String, String>) request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
		Long uriId = Long.parseLong(map.get("id"));

		List<FieldMessage> lista = new ArrayList<>();
		
		Usuario usuario = usuarioRepository.findByEmail(dto.getEmail());
		if (usuario != null && !usuario.getId().equals(uriId)) {
			lista.add(new FieldMessage("email", "e-Mail existente"));
		}
		
		for (FieldMessage e : lista) {
			context.disableDefaultConstraintViolation();
			context.buildConstraintViolationWithTemplate(e.getMessage()).addPropertyNode(e.getFieldName())
					.addConstraintViolation();
		}
		
		return lista.isEmpty();
	}

}
