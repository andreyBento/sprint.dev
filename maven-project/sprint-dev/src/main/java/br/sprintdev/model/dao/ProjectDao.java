package br.sprintdev.model.dao;

import java.util.List;

import br.sprintdev.model.entity.Project;

public interface ProjectDao {

	void save(Project project);
	
	void update(Project project);
	
	void delete(Long id);
	
	Project findById(Long id);
	
	List<Project> findAll();
	
}
