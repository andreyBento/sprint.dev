package br.sprintdev.controller.dto;

import java.util.List;
import java.util.stream.Collectors;

import br.sprintdev.model.entity.Project;

public class ProjectDto {

	private Long id;
	private String name;
	private String bgColor;
	private List<BoxDto> boxes;
	
	public ProjectDto(Project project) {
		this.id = project.getId();
		this.name = project.getName();
		this.bgColor = project.getBgColor();
		this.boxes = BoxDto.converter(project.getBoxes());
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

	public List<BoxDto> getBoxes() {
		return boxes;
	}

	public static List<ProjectDto> converter(List<Project> projects) {
		if(projects == null) {
			return null;
		}
		return projects.stream().map(ProjectDto::new).collect(Collectors.toList());
	}
}
