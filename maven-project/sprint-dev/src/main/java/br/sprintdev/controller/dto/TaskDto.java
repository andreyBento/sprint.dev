package br.sprintdev.controller.dto;

import java.util.List;
import java.util.stream.Collectors;

import br.sprintdev.model.entity.Task;

public class TaskDto {
	
	private Long id;
	private String name;
	private String msg;
	private String status;
	private String priority;
	private String area;
	private List<WorkerDto> workers;
    private List<CommentDto> comments;
	
	public Long getId() {
		return id;
	}
	public String getName() {
		return name;
	}
	public String getMsg() { return msg; }
	public String getStatus() {
		return status;
	}
	public String getPriority() {
		return priority;
	}
	public String getArea() {
		return area;
	}
    public List<WorkerDto> getWorkers() {
        return workers;
    }
    public List<CommentDto> getComments() {
        return comments;
    }

	public TaskDto(Task task) {
		this.id = task.getId();
		this.name = task.getName();
		this.msg = task.getMsg();
		this.status = task.getStatus();
		this.priority = task.getPriority();
		this.area = task.getArea();
		this.workers = WorkerDto.converter(task.getWorkers());
		this.comments = CommentDto.converter(task.getComments());
	}
	
	public static List<TaskDto> converter(List<Task> tasksP) {
		if(tasksP == null) {
			return null;
		}
		return tasksP.stream().map(TaskDto::new).collect(Collectors.toList());
	}

}
