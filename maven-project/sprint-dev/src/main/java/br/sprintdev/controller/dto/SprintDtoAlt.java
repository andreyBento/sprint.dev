package br.sprintdev.controller.dto;

import br.sprintdev.model.entity.Sprint;

import java.util.List;
import java.util.stream.Collectors;

public class SprintDtoAlt {

	private Long id;
	private String name;
	private String expiresAt;
	private BoxDtoAlt box;
	private ProjectDtoAlt project;

	public SprintDtoAlt(Sprint sprint) {
		this.id = sprint.getId();
		this.name = sprint.getName();
		this.expiresAt = sprint.getExpiresAt();
		this.box = new BoxDtoAlt(sprint.getSprint_owner());
		this.project = new ProjectDtoAlt(sprint.getSprint_owner().getBox_owner());
	}
	
	public Long getId() {
		return id;
	}
	public String getName() {
		return name;
	}
	public String getExpiresAt() {
		return expiresAt;
	}
	public BoxDtoAlt getBox() {
		return box;
	}
	public ProjectDtoAlt getProject() {
		return project;
	}

	public static List<SprintDtoAlt> converter(List<Sprint> sprints) {
		if(sprints == null) {
			return null;
		}
		return sprints.stream().map(SprintDtoAlt::new).collect(Collectors.toList());
	}
	
}
