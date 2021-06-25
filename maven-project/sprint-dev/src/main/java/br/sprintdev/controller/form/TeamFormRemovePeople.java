package br.sprintdev.controller.form;

import br.sprintdev.model.entity.Team;
import br.sprintdev.model.entity.User;
import br.sprintdev.model.service.TeamService;
import br.sprintdev.model.service.UserService;

import java.util.ArrayList;
import java.util.List;

public class TeamFormRemovePeople {

    private Long idUser;

    public Long getIdUser() {
        return idUser;
    }

    public Team convert (Long id, TeamService teamService){
        Team team = teamService.findById(id);

        List<User> users = team.getTeam_people();
        users.removeIf(user -> user.getId().equals(idUser));
        team.setTeam_people(users);

        return team;
    }
}
