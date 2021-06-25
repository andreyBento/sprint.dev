package br.sprintdev.controller.form;

import br.sprintdev.model.entity.User;
import br.sprintdev.model.service.UserService;

public class UpdateUserForm {
	
	private String firstName;

	private String lastName;

	private String username;
	
	private String email;
	
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

	public User update(Long id, UserService service) {
		User user = service.findById(id);
		
		user.setFirstName(this.firstName);
		user.setLastName(this.lastName);
		user.setUsername(this.username);
		user.setEmail(this.email);
		user.setBgColor(this.bgColor);

		return user;
	}
}
