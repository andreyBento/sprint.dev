package br.sprintdev.model.dao;

import org.springframework.stereotype.Repository;

import br.sprintdev.model.entity.User;

@Repository
public class UserDaoImpl extends AbstractDao<User, Long> implements UserDao {
	
}
