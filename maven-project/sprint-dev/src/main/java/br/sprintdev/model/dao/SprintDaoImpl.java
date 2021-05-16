package br.sprintdev.model.dao;

import org.springframework.stereotype.Repository;

import br.sprintdev.model.entity.Sprint;

@Repository
public class SprintDaoImpl extends AbstractDao<Sprint, Long> implements SprintDao {

}
