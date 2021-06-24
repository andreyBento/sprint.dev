package br.sprintdev.model.dao;

import br.sprintdev.model.entity.Team;

import java.util.List;

public interface TeamDao {

    void save(Team box);

    void update(Team box);

    void delete(Long id);

    Team findById(Long id);

    List<Team> findAll();

}
