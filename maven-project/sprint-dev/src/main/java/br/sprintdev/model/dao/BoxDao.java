package br.sprintdev.model.dao;

import java.util.List;

import br.sprintdev.model.entity.Box;

public interface BoxDao {
	
	void save(Box box);
	
	void update(Box box);
	
	void delete(Long id);
	
	Box findById(Long id);
	
	List<Box> findAll();

}
