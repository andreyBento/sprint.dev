package br.sprintdev.controller.form;

import br.sprintdev.model.entity.User;

public class UserForm {
	
	private String firstName;

	private String lastName;
	
	private String email;
	
	private String password;
	
	private String username;
	
	private String bgColor;

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

	public String getBgColor() {
		return bgColor;
	}

	public void setBgColor(String bgColor) {
		this.bgColor = bgColor;
	}
	
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public User convert() {
		return new User(firstName, lastName, email, password, username, bgColor);
	}
	
}
