package br.sprintdev.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.sprintdev.model.dao.SprintDao;
import br.sprintdev.model.entity.Sprint;

@Service @Transactional(readOnly = false)
public class SprintServiceImpl implements SprintService {

	@Autowired
	private SprintDao dao;

	@Override
	public void create(Sprint sprint) {
		dao.save(sprint);
	}

	@Override
	public void update(Sprint sprint) {
		dao.update(sprint);
	}

	@Override
	public void delete(Long id) {
		dao.delete(id);
	}

	@Override
	public Sprint findById(Long id) {
		return dao.findById(id);
	}

	@Override
	public List<Sprint> findAll() {
		return dao.findAll();
	}
	
}
