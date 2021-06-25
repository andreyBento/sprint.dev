package br.sprintdev.controller.form;

import br.sprintdev.model.entity.Sprint;
import br.sprintdev.model.entity.Team;
import br.sprintdev.model.entity.User;
import br.sprintdev.model.service.SprintService;
import br.sprintdev.model.service.UserService;

import java.util.ArrayList;
import java.util.List;

public class TeamFormCreateAlt {
    private String name;
    private String bgColor;
    private List<Long> people;
    private List<Long> team_sprints;

    public String getName() {
        return name;
    }
    public String getBgColor() {
        return bgColor;
    }
    public List<Long> getPeople() {
        return people;
    }
    public List<Long> getTeam_sprints() {
        return team_sprints;
    }

    public Team convert (UserService userService, SprintService sprintService){

        List<User> users = new ArrayList<User>();
        for(Long idIncommingUser:people){
            users.add(userService.findById(idIncommingUser));
        }

        List<Sprint> sprints = new ArrayList<Sprint>();
        for(Long idIncommingSprint:team_sprints){
            sprints.add(sprintService.findById(idIncommingSprint));
        }

        return new Team(name, bgColor, users, sprints);

    }
}
