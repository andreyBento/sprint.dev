package br.sprintdev.controller.form;

import br.sprintdev.model.entity.Task;
import br.sprintdev.model.entity.User;
import br.sprintdev.model.service.TaskService;
import br.sprintdev.model.service.UserService;

import java.util.ArrayList;
import java.util.List;

public class UpdateTaskStatusForm {

	private String status;

	public String getStatus() {
		return status;
	}

	public Task update(Long id, TaskService service) {
		Task task = service.findById(id);
		task.setStatus(this.status);
		return task;
	}
	
}
