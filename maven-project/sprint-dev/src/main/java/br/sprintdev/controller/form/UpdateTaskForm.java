package br.sprintdev.controller.form;

import br.sprintdev.model.entity.Task;
import br.sprintdev.model.entity.Team;
import br.sprintdev.model.entity.User;
import br.sprintdev.model.service.TaskService;
import br.sprintdev.model.service.TeamService;
import br.sprintdev.model.service.UserService;

import java.util.ArrayList;
import java.util.List;

public class UpdateTaskForm {

	private String name;
	private String desc;
	private String priority;
	private Long area;
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
	public Long getArea() {
		return area;
	}
	public List<Long> getWorkers() {
		return workers;
	}
	public String getStatus() {
		return status;
	}

	public Task update(Long id, TaskService service, UserService userService, TeamService teamService) {
		Task task = service.findById(id);
		
		task.setName(this.name);
		task.setMsg(this.desc);
		task.setPriority(this.priority);

		Team team = teamService.findById(this.area);
		task.setArea(team);

		task.setStatus(this.status);

		List<User> listUser = new ArrayList<User>();

		if(!this.status.equals("backlog")){
			for(Long idIncommingWorker:workers){
				listUser.add(userService.findById(idIncommingWorker));
			}
		}

		task.setWorkers(listUser);

		return task;
	}
	
}
