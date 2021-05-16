package br.sprintdev.controller.form;

import br.sprintdev.model.entity.Sprint;
import br.sprintdev.model.service.SprintService;

public class UpdateSprintForm {
	
	private String name;
	private String expireAt;
	
	public String getName() {
		return name;
	}
	public String getExpireAt() {
		return expireAt;
	}
	
	public Sprint update(Long id, SprintService service) {
		Sprint sprint = service.findById(id);
		
		sprint.setName(this.name);
		sprint.setExpiresAt(this.expireAt);
		
		return sprint;
	}

}
