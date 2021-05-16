package br.sprintdev.model.dao;

import java.util.List;

import br.sprintdev.model.entity.Sprint;

public interface SprintDao {

	void save(Sprint project);
	
	void update(Sprint project);
	
	void delete(Long id);
	
	Sprint findById(Long id);
	
	List<Sprint> findAll();
	
}
