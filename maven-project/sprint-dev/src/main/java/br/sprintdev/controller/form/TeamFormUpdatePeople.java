package br.sprintdev.controller.form;

import br.sprintdev.model.entity.Team;
import br.sprintdev.model.entity.User;
import br.sprintdev.model.service.TeamService;
import br.sprintdev.model.service.UserService;

import java.util.ArrayList;
import java.util.List;

public class TeamFormUpdatePeople {

    private List<Long> idPeople;

    public List<Long> getIdPeople() {
        return idPeople;
    }

    public Team convert (Long id, TeamService teamService, UserService userService){
        Team team = teamService.findById(id);

        List<User> listIncommingUser = new ArrayList<User>();
        for(Long incommingIdUser:this.idPeople){
            listIncommingUser.add(userService.findById(incommingIdUser));
        }

        team.setPeople(listIncommingUser);

        return team;
    }
}
