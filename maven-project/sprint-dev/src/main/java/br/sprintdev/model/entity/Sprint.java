package br.sprintdev.model.entity;

import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@SuppressWarnings("serial")
@Entity
@Table(name="SPRINTS")
public class Sprint extends AbstractEntity<Long> {
	
	@NotNull
	private String name;

	@ManyToOne
	@JoinColumn(name = "sprint_owner_id")
	private Box sprint_owner;

	@ManyToOne
	@JoinColumn(name = "project_sprint_id")
	private Project project_sprint;
	
	@NotNull
	private String expiresAt;

	@OneToMany(mappedBy = "task_owner")
	private List<Task> tasks;

	@OneToMany(mappedBy = "sprint")
	private List<Event> events;
	
	public Sprint() {
		
	}
	
	public Sprint(String name, String expireAt, Box box) {
		this.name = name;
		this.expiresAt = expireAt;
		this.sprint_owner = box;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Box getSprint_owner() {
		return sprint_owner;
	}

	public void setSprint_owner(Box sprint_owner) {
		this.sprint_owner = sprint_owner;
	}

	public String getExpiresAt() {
		return expiresAt;
	}

	public void setExpiresAt(String expiresAt) {
		this.expiresAt = expiresAt;
	}

	public List<Task> getTasks() {
		return tasks;
	}

	public void setTasks(List<Task> tasksP) {
		this.tasks = tasksP;
	}

	public Project getProject_sprint() {
		return project_sprint;
	}

	public void setProject_sprint(Project project_sprint) {
		this.project_sprint = project_sprint;
	}

	public List<Event> getEvents() {
		return events;
	}

	public void setEvents(List<Event> events) {
		this.events = events;
	}
}
