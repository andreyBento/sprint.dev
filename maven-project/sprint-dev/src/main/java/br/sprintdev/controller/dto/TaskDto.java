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
	private TeamDtoAlt area;
	private List<WorkerDto> workers;
    private List<CommentDto> comments;
    private String updatedAt;
	
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
	public TeamDtoAlt getArea() {
		return area;
	}
    public List<WorkerDto> getWorkers() {
        return workers;
    }
    public List<CommentDto> getComments() {
        return comments;
    }
	public String getUpdatedAt() {
		return updatedAt;
	}

	public TaskDto(Task task) {
		this.id = task.getId();
		this.name = task.getName();
		this.msg = task.getMsg();
		this.status = task.getStatus();
		this.priority = task.getPriority();
		this.area = new TeamDtoAlt(task.getArea());
		this.workers = WorkerDto.converter(task.getWorkers());
		this.comments = CommentDto.converter(task.getComments());
		this.updatedAt = task.getUpdatedAt();
	}
	
	public static List<TaskDto> converter(List<Task> tasksP) {
		if(tasksP == null) {
			return null;
		}
		return tasksP.stream().map(TaskDto::new).collect(Collectors.toList());
	}

}
