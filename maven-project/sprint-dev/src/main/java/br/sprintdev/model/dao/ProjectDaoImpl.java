package br.sprintdev.model.dao;

import org.springframework.stereotype.Repository;

import br.sprintdev.model.entity.Project;

@Repository
public class ProjectDaoImpl extends AbstractDao<Project, Long> implements ProjectDao {

}
