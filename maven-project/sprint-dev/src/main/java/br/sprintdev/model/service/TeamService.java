package br.sprintdev.model.service;

import br.sprintdev.model.entity.Team;

import java.util.List;

public interface TeamService {

    void create(Team box);

    void update(Team box);

    void delete(Long id);

    Team findById(Long id);

    List<Team> findAll();

}
