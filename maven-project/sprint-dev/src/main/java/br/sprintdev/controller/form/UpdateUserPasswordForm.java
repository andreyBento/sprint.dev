package br.sprintdev.controller.form;

import br.sprintdev.model.entity.User;
import br.sprintdev.model.service.UserService;

public class UpdateUserPasswordForm {
	
	private String password;

	public String getPassword() {
		return password;
	}

	public User update(Long id, UserService service) {
		User user = service.findById(id);
		
		user.setPassword(this.password);
		
		return user;
	}
}
