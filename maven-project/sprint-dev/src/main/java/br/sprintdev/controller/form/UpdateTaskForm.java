package br.sprintdev.controller.form;

import br.sprintdev.model.entity.Task;
import br.sprintdev.model.service.TaskService;

public class UpdateTaskForm {

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
