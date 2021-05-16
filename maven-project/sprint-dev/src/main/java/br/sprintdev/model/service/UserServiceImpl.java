package br.sprintdev.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.sprintdev.model.dao.UserDao;
import br.sprintdev.model.entity.User;

@Service @Transactional(readOnly = false)
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserDao dao;

	@Override
	public void create(User user) {
		dao.save(user);
	}

	@Override
	public void update(User user) {
		dao.update(user);
	}

	@Override
	public void delete(Long id) {
		dao.delete(id);
	}

	@Override
	public User findById(Long id) {
		return dao.findById(id);
	}

	@Override
	public List<User> findAll() {
		return dao.findAll();
	}

}
