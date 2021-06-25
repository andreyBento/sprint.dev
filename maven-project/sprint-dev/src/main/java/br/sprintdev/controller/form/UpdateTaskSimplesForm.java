package br.sprintdev.controller.form;

import br.sprintdev.model.entity.Task;
import br.sprintdev.model.entity.Team;
import br.sprintdev.model.entity.User;
import br.sprintdev.model.service.TaskService;
import br.sprintdev.model.service.TeamService;
import br.sprintdev.model.service.UserService;

import java.util.ArrayList;
import java.util.List;

public class UpdateTaskSimplesForm {

	private String name;
	private String desc;

	public String getName() {
		return name;
	}
	public String getDesc() {
		return desc;
	}

	public Task update(Long id, TaskService service) {
		Task task = service.findById(id);
		
		task.setName(this.name);
		task.setMsg(this.desc);

		return task;
	}
	
}
