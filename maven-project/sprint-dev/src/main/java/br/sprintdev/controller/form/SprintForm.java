package br.sprintdev.controller.form;

import br.sprintdev.model.entity.Box;
import br.sprintdev.model.entity.Sprint;
import br.sprintdev.model.service.BoxService;

public class SprintForm {
	
	private String name;
	private String expiresAt;
	private Long idBox;
	
	public String getName() {
		return name;
	}
	public Long getIdBox() {
		return idBox;
	}
	
	public String getExpiresAt() {
		return expiresAt;
	}
	
	public Sprint convert(BoxService service) {
		Box box = service.findById(idBox);
		return new Sprint(name, expiresAt, box);
	}

}
