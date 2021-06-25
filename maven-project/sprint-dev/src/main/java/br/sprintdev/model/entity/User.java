package br.sprintdev.model.entity;

import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@SuppressWarnings("serial")
@Entity
@Table(name="USERS")
public class User extends AbstractEntity<Long> {
	
	@NotBlank
	private String firstName;
	
	@NotBlank
	private String lastName;
	
	@NotBlank
	@Column(unique = true)
	private String email;
	
	@NotBlank
	private String password;
	
	private String username;
	
	@NotBlank
	private String bgColor;
	
	@OneToMany(mappedBy = "owner")
	private List<Project> projects;

	@ManyToMany(mappedBy = "workers")
	private List<Task> tasks;

	@OneToMany(mappedBy = "user")
	private List<Comment> comments;

	private Boolean online;

	@ManyToMany(mappedBy = "team_people")
	private List<Team> teams;
	
	public User() {
		
	}

	public User(@NotBlank String firstName, @NotBlank String lastName, @NotBlank String email,
			@NotBlank String password, String username, @NotBlank String bgColor) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.username = username;
		this.bgColor = bgColor;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getBgColor() {
		return bgColor;
	}

	public void setBgColor(String bgColor) {
		this.bgColor = bgColor;
	}

	public List<Project> getProjects() {
		return projects;
	}

	public void setProjects(List<Project> projects) {
		this.projects = projects;
	}

	public List<Task> getTasks() {
		return tasks;
	}

	public void setTasks(List<Task> tasks) {
		this.tasks = tasks;
	}

	public List<Comment> getComments() {
		return comments;
	}

	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}

	public Boolean getOnline() {
		return online;
	}

	public void setOnline(Boolean online) {
		this.online = online;
	}

	public List<Team> getTeams() {
		return teams;
	}

	public void setTeams(List<Team> teams) {
		this.teams = teams;
	}
}
