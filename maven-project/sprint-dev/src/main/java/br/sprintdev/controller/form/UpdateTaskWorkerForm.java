package br.sprintdev.controller.form;

import br.sprintdev.model.entity.Task;
import br.sprintdev.model.entity.User;
import br.sprintdev.model.service.TaskService;
import br.sprintdev.model.service.UserService;

import java.util.ArrayList;
import java.util.List;

public class UpdateTaskWorkerForm {

	private List<Long> workers;

	public List<Long> getWorkers() {
		return workers;
	}

	public Task update(Long id, TaskService service, UserService userService) {
		Task task = service.findById(id);
		List<User> listUser = new ArrayList<User>();

		for(Long idIncommingWorker:workers){
			listUser.add(userService.findById(idIncommingWorker));
		}

		task.setWorkers(listUser);
		return task;
	}
	
}
