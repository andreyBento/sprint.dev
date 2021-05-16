package br.sprintdev.controller.form;

import br.sprintdev.model.entity.Box;
import br.sprintdev.model.entity.Project;
import br.sprintdev.model.service.ProjectService;

public class BoxForm {

	private String name;
	
	private Long idProject;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getIdProject() {
		return idProject;
	}

	public void setIdProject(Long idProject) {
		this.idProject = idProject;
	}
	
	public Box convert(ProjectService service) {
		Project project = service.findById(idProject);
		return new Box(name, project);
	}
	
}
