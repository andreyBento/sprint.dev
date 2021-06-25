package br.sprintdev.controller.dto;

import br.sprintdev.model.entity.Project;

import java.util.List;
import java.util.stream.Collectors;

public class ProjectDtoAlt {

	private Long id;
	private String name;
	private String bgColor;

	public ProjectDtoAlt(Project project) {
		this.id = project.getId();
		this.name = project.getName();
		this.bgColor = project.getBgColor();
	}
	
	public String getName() {
		return name;
	}
	public String getBgColor() {
		return bgColor;
	}
	public Long getId() {
		return id;
	}

	public static List<ProjectDtoAlt> converter(List<Project> projects) {
		if(projects == null) {
			return null;
		}
		return projects.stream().map(ProjectDtoAlt::new).collect(Collectors.toList());
	}
}
