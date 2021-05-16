package br.sprintdev.controller.form;

import br.sprintdev.model.service.BoxService;
import br.sprintdev.model.entity.Box;

public class UpdateBoxForm {

	private String name;
	
	public Box update(Long id, BoxService service) {
		Box box = service.findById(id);
		
		box.setName(this.name);
		
		return box;
	}
	
}
