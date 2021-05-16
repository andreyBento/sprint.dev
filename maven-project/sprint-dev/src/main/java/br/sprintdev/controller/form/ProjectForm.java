package br.sprintdev.controller.form;

import br.sprintdev.model.entity.Project;
import br.sprintdev.model.entity.User;
import br.sprintdev.model.service.UserService;

public class ProjectForm {
	
	private String name;
	
	private String bgColor;
	
	private Long idUser;

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

	public Long getIdUser() {
		return idUser;
	}

	public void setIdUser(Long idUser) {
		this.idUser = idUser;
	}

	public Project convert(UserService service) {
		User user = service.findById(idUser);
		return new Project(name, bgColor, user);
	}

}
