package br.sprintdev.model.service;

import java.util.List;

import br.sprintdev.model.entity.User;

public interface UserService {
	
	void create(User user);
	
	void update(User user);
	
	void delete(Long id);
	
	User findById(Long id);
	
	List<User> findAll();

}
