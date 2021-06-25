package br.sprintdev.controller.dto;

import java.util.List;
import java.util.stream.Collectors;

import br.sprintdev.model.entity.Sprint;

public class SprintDto {
	
	private Long id;
	private String name;
	private String expiresAt;
	private List<TaskDto> tasks;
	private List<TeamDto> teams;
	
	public SprintDto(Sprint sprint) {
		this.id = sprint.getId();
		this.name = sprint.getName();
		this.expiresAt = sprint.getExpiresAt();
		this.tasks = TaskDto.converter(sprint.getTasks());
		this.teams = TeamDto.converter(sprint.getTeams());
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
	public List<TeamDto> getTeams() {
		return teams;
	}
	public List<TaskDto> getTasks() {
		return tasks;
	}

	public static List<SprintDto> converter(List<Sprint> sprints) {
		if(sprints == null) {
			return null;
		}
		return sprints.stream().map(SprintDto::new).collect(Collectors.toList());
	}
	
}
