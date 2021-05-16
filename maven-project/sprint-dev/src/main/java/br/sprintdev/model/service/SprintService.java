package br.sprintdev.model.service;

import java.util.List;

import br.sprintdev.model.entity.Sprint;

public interface SprintService {

	void create(Sprint sprint);
	
	void update(Sprint sprint);
	
	void delete(Long id);
	
	Sprint findById(Long id);
	
	List<Sprint> findAll();
	
}
