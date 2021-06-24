package br.sprintdev.controller.form;

import br.sprintdev.model.entity.Sprint;
import br.sprintdev.model.entity.Team;
import br.sprintdev.model.entity.User;
import br.sprintdev.model.service.SprintService;
import br.sprintdev.model.service.TeamService;

import java.util.ArrayList;
import java.util.List;

public class TeamFormUpdateSprint {

    private List<Long> idSprints;

    public List<Long> getIdSprints() {
        return idSprints;
    }

    public Team convert (Long id, TeamService teamService, SprintService sprintService){
        Team team = teamService.findById(id);

        List<Sprint> listIncommingSprint = new ArrayList<Sprint>();
        for(Long incommingIdSprint:this.idSprints){
            listIncommingSprint.add(sprintService.findById(incommingIdSprint));
        }

        team.setTeam_sprints(listIncommingSprint);

        return team;
    }
}
