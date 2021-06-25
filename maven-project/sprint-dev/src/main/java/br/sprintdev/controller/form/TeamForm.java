package br.sprintdev.controller.form;

import br.sprintdev.model.entity.Team;
import br.sprintdev.model.service.SprintService;
import br.sprintdev.model.entity.Sprint;

import java.util.ArrayList;
import java.util.List;

public class TeamForm {
    private String name;
    private String bgColor;
    private List<Long> team_sprints;

    public String getName() {
        return name;
    }
    public String getBgColor() {
        return bgColor;
    }
    public List<Long> getTeam_sprints() {
        return team_sprints;
    }

    public Team convert (SprintService sprintService){
        List<Sprint> sprints = new ArrayList<Sprint>();
        for(Long idIncommingSprint:team_sprints){
            sprints.add(sprintService.findById(idIncommingSprint));
        }

        return new Team(name, bgColor, sprints);
    }
}
