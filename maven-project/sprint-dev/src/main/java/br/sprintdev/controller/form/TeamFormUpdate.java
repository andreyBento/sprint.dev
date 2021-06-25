package br.sprintdev.controller.form;

import br.sprintdev.model.entity.Task;
import br.sprintdev.model.entity.Team;
import br.sprintdev.model.service.TaskService;
import br.sprintdev.model.service.TeamService;

import java.util.List;

public class TeamFormUpdate {

    private String name;
    private String bgColor;

    public String getName() {
        return name;
    }
    public String getBgColor() {
        return bgColor;
    }

    public Team convert (Long id, TeamService teamService){
        Team team = teamService.findById(id);

        team.setName(this.name);
        team.setBgColor(this.bgColor);

        return team;
    }
}
