package br.sprintdev.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.sprintdev.model.dao.ProjectDao;
import br.sprintdev.model.entity.Project;

@Service @Transactional(readOnly = false)
public class ProjectServiceImpl implements ProjectService {

	@Autowired
	private ProjectDao dao;

	@Override
	public void create(Project project) {
		dao.save(project);
	}

	@Override
	public void update(Project project) {
		dao.update(project);
	}

	@Override
	public void delete(Long id) {
		dao.delete(id);
	}

	@Override
	public Project findById(Long id) {
		return dao.findById(id);
	}

	@Override
	public List<Project> findAll() {
		return dao.findAll();
	}
	
}
