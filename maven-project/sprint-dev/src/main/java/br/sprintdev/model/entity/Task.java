package br.sprintdev.model.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@SuppressWarnings("serial")
@Entity
@Table(name="TASKS")
public class Task extends AbstractEntity<Long> {

	@NotNull
	private String name;
	
	@NotNull
	private String msg;

	@ManyToOne
	@JoinColumn(name = "task_owner_id")
	private Sprint task_owner;

	@ManyToMany(mappedBy = "tasks")
	private List<User> workers;

	@NotNull
	private String status;

	@OneToMany(mappedBy = "task")
	private List<Comment> comments;

	public Task() {
		
	}
	
	public Task(String name, String msg, Sprint sprint, String status) {
		this.name = name;
		this.msg = msg;
		this.task_owner = sprint;
		this.status = status;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String desc) {
		this.msg = desc;
	}

	public Sprint getTarefas_owner() {
		return task_owner;
	}

	public void setTarefas_owner(Sprint task_owner) {
		this.task_owner = task_owner;
	}

	public Sprint getTask_owner() {
		return task_owner;
	}

	public void setTask_owner(Sprint task_owner) {
		this.task_owner = task_owner;
	}

	public List<User> getWorkers() {
		return workers;
	}

	public void setWorkers(List<User> workers) {
		this.workers = workers;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<Comment> getComments() {
		return comments;
	}

	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}
}
