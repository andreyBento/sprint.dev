package br.sprintdev.model.dao;

import org.springframework.stereotype.Repository;

import br.sprintdev.model.entity.Task;

@Repository
public class TaskDaoImpl extends AbstractDao<Task, Long> implements TaskDao {

}
