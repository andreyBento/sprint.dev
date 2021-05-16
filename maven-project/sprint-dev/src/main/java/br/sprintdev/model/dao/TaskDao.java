package br.sprintdev.model.dao;

import java.util.List;

import br.sprintdev.model.entity.Task;

public interface TaskDao {
	
	void save(Task task);
	
	void update(Task task);
	
	void delete(Long id);
	
	Task findById(Long id);
	
	List<Task> findAll();

}
