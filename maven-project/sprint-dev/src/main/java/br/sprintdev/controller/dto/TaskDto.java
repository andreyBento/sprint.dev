package br.sprintdev.controller.dto;

import java.util.List;
import java.util.stream.Collectors;

import br.sprintdev.model.entity.Task;

public class TaskDto {
	
	private Long id;
	private String name;
	private String desc;
	
	public Long getId() {
		return id;
	}
	public String getName() {
		return name;
	}
	public String getDesc() {
		return desc;
	}
	
	public TaskDto(Task task) {
		this.id = task.getId();
		this.name = task.getName();
		this.desc = task.getMsg();
	}
	
	public static List<TaskDto> converter(List<Task> tasksP) {
		if(tasksP == null) {
			return null;
		}
		return tasksP.stream().map(TaskDto::new).collect(Collectors.toList());
	}

}
