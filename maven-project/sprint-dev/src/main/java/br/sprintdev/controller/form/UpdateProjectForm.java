package br.sprintdev.controller.form;

import br.sprintdev.model.entity.Project;
import br.sprintdev.model.service.ProjectService;

public class UpdateProjectForm {

	private String name;
	
	private String bgColor;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getBgColor() {
		return bgColor;
	}

	public void setBgColor(String bgColor) {
		this.bgColor = bgColor;
	}

	public Project update(Long id, ProjectService service) {
		Project project = service.findById(id);
		
		project.setName(this.name);
		project.setBgColor(this.bgColor);
		
		return project;
	}
	
	
	
}
