package br.sprintdev.model.service;

import java.util.List;

import br.sprintdev.model.entity.Task;

public interface TaskService {

	void create(Task task);
	
	void update(Task task);
	
	void delete(Long id);
	
	Task findById(Long id);
	
	List<Task> findAll();
	
}
