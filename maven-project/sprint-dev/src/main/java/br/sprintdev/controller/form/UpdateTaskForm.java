package br.sprintdev.controller.form;

import br.sprintdev.model.entity.Task;
import br.sprintdev.model.entity.User;
import br.sprintdev.model.service.TaskService;
import br.sprintdev.model.service.UserService;

import java.util.ArrayList;
import java.util.List;

public class UpdateTaskForm {

	private String name;
	private String desc;
	private String priority;
	private String area;
	private String status;
	private List<Long> workers;

	public String getName() {
		return name;
	}
	public String getDesc() {
		return desc;
	}
	public String getPriority() {
		return priority;
	}
	public String getArea() {
		return area;
	}
	public List<Long> getWorkers() {
		return workers;
	}
	public String getStatus() {
		return status;
	}

	public Task update(Long id, TaskService service, UserService userService) {
		Task task = service.findById(id);
		
		task.setName(this.name);
		task.setMsg(this.desc);
		task.setPriority(this.priority);
		task.setArea(this.area);
		task.setStatus(this.status);

		List<User> listUser = new ArrayList<User>();

		for(Long idWorker:workers)
			listUser.add(userService.findById(idWorker));

		task.setWorkers(listUser);

		return task;
	}
	
}
