package br.sprintdev.model.service;

import java.util.List;

import br.sprintdev.model.entity.Box;

public interface BoxService {

	void create(Box box);
	
	void update(Box box);
	
	void delete(Long id);
	
	Box findById(Long id);
	
	List<Box> findAll();
	
}
