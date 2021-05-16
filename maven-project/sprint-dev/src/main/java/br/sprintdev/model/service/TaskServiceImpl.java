package br.sprintdev.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.sprintdev.model.dao.TaskDao;
import br.sprintdev.model.entity.Task;

@Service @Transactional(readOnly = false)
public class TaskServiceImpl implements TaskService {
	
	@Autowired
	private TaskDao dao;

	@Override
	public void create(Task task) {
		dao.save(task);
	}

	@Override
	public void update(Task task) {
		dao.update(task);
	}

	@Override
	public void delete(Long id) {
		dao.delete(id);
	}

	@Override
	public Task findById(Long id) {
		return dao.findById(id);
	}

	@Override
	public List<Task> findAll() {
		return dao.findAll();
	}

}
