package br.sprintdev.model.service;

import br.sprintdev.model.dao.TeamDao;
import br.sprintdev.model.entity.Team;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = false)
public class TeamServiceImpl implements TeamService {

    @Autowired
    private TeamDao dao;

    @Override
    public void create(Team team) {
        dao.save(team);
    }

    @Override
    public void update(Team team) {
        dao.update(team);
    }

    @Override
    public void delete(Long id) {
        dao.delete(id);
    }

    @Override
    public Team findById(Long id) {
        return dao.findById(id);
    }

    @Override
    public List<Team> findAll() {
        return dao.findAll();
    }

}