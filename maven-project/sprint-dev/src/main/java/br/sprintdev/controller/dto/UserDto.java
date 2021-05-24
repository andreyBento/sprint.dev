package br.sprintdev.controller.dto;

import java.util.List;
import java.util.stream.Collectors;

import br.sprintdev.model.entity.User;

public class UserDto {
	
	private Long id;
	private String firstName;
	private String lastName;
	private String username;
	private String email;
	private String password;
	private List<ProjectDto> projects;
	private String bgColor;
	private Boolean online;
	
	public UserDto(User user) {
		this.id = user.getId();
		this.firstName = user.getFirstName();
		this.lastName = user.getLastName();
		this.username = user.getUsername();
		this.email = user.getEmail();
		this.password = user.getPassword();
		this.projects = ProjectDto.converter(user.getProjects());
		this.bgColor = user.getBgColor();
		this.online = user.getOnline();
	}
	
	public String getFirstName() {
		return firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public String getUsername() {
		return username;
	}
	public String getEmail() {
		return email;
	}
	public String getPassword() {
		return password;
	}
	public Long getId() {
		return id;
	}
	public List<ProjectDto> getProjects() {
		return projects;
	}
	public String getBgColor() {
		return bgColor;
	}
	public Boolean getOnline() {
		return online;
	}

	public static List<UserDto> converter(List<User> users) {
		return users.stream().map(UserDto::new).collect(Collectors.toList());
	}

}
