package br.sprintdev.controller.form;

import br.sprintdev.model.entity.Sprint;
import br.sprintdev.model.entity.Task;
import br.sprintdev.model.entity.Team;
import br.sprintdev.model.service.SprintService;
import br.sprintdev.model.service.TeamService;

public class TaskForm {
	
	private String name;
	private String desc;
	private Long idSprint;
	private String status;
	private String priority;
	private Long idTeam;
	
	public String getName() {
		return name;
	}
	public String getDesc() {
		return desc;
	}
	public Long getIdSprint() {
		return idSprint;
	}
	public String getStatus() {
		return status;
	}
	public String getPriority() {
		return priority;
	}
	public Long getIdTeam() {
		return idTeam;
	}

	public Task convert(SprintService service, TeamService teamService) {
		Sprint sprint = service.findById(idSprint);
		Team area = teamService.findById(idTeam);
		return new Task(name, desc, sprint, status, priority, area);
	}

}
