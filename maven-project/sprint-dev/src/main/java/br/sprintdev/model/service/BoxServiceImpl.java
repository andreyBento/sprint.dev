package br.sprintdev.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.sprintdev.model.dao.BoxDao;
import br.sprintdev.model.entity.Box;

@Service @Transactional(readOnly = false)
public class BoxServiceImpl implements BoxService {
	
	@Autowired
	private BoxDao dao;

	@Override
	public void create(Box box) {
		dao.save(box);
	}

	@Override
	public void update(Box box) {
		dao.update(box);
	}

	@Override
	public void delete(Long id) {
		dao.delete(id);
	}

	@Override
	public Box findById(Long id) {
		return dao.findById(id);
	}

	@Override
	public List<Box> findAll() {
		return dao.findAll();
	}
	
}
