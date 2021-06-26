package br.sprintdev.controller.form;

import br.sprintdev.model.entity.Event;
import br.sprintdev.model.entity.Sprint;
import br.sprintdev.model.entity.Team;
import br.sprintdev.model.service.SprintService;
import br.sprintdev.model.service.TeamService;

import java.util.ArrayList;
import java.util.List;

public class EventForm {

    private String name;
    private String msg;
    private String date;
    private List<Long> event_teams;
    private Long idSprint;

    public String getName() {
        return name;
    }
    public String getMsg() {
        return msg;
    }
    public String getDate() {
        return date;
    }
    public Long getIdSprint() {
        return idSprint;
    }
    public List<Long> getEvent_teams() {
        return event_teams;
    }

    public Event convert(SprintService sprintService, TeamService teamService) {
        Sprint sprint = sprintService.findById(idSprint);

        List<Team> teams = new ArrayList<Team>();
        for(Long idIncomming:event_teams){
            teams.add(teamService.findById(idIncomming));
        }

        return new Event(name, msg, date, teams, sprint);
    }

}
