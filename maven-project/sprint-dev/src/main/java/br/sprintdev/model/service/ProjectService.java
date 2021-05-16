package br.sprintdev.model.service;

import java.util.List;

import br.sprintdev.model.entity.Project;

public interface ProjectService {

	void create(Project project);
	
	void update(Project project);
	
	void delete(Long id);
	
	Project findById(Long id);
	
	List<Project> findAll();
	
}
