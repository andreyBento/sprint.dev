package br.sprintdev.controller.dto;

import br.sprintdev.model.entity.User;

import java.util.List;
import java.util.stream.Collectors;

public class UserDtoAlt {

	private Long id;
	private String firstName;
	private String lastName;
	private String username;

	public UserDtoAlt(User user) {
		this.id = user.getId();
		this.firstName = user.getFirstName();
		this.lastName = user.getLastName();
		this.username = user.getUsername();
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
	public Long getId() {
		return id;
	}

	public static List<UserDtoAlt> converter(List<User> users) {
		return users.stream().map(UserDtoAlt::new).collect(Collectors.toList());
	}

}
