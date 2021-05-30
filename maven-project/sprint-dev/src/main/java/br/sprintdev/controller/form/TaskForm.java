package br.sprintdev.controller.form;

import br.sprintdev.model.entity.Sprint;
import br.sprintdev.model.entity.Task;
import br.sprintdev.model.service.SprintService;

public class TaskForm {
	
	private String name;
	private String desc;
	private Long idSprint;
	private String status;
	private String priority;
	private String area;
	
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
	public String getArea() {
		return area;
	}

	public Task convert(SprintService service) {
		Sprint sprint = service.findById(idSprint);
		return new Task(name, desc, sprint, status, priority, area);
	}

}
