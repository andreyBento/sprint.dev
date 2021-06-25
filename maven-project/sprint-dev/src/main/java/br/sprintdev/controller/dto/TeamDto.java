package br.sprintdev.controller.dto;

import br.sprintdev.model.entity.Team;

import java.util.List;
import java.util.stream.Collectors;

public class TeamDto {

    private Long id;
    private String name;
    private String bgColor;
    private List<UserDtoAlt> people;
    private List<TaskDtoAlt> tasks;
    private List<EventDtoAlt> events;

    public TeamDto(Team team){
        this.id = team.getId();
        this.name = team.getName();
        this.bgColor = team.getBgColor();
        this.people = UserDtoAlt.converter(team.getTeam_people());
        this.tasks = TaskDtoAlt.converter(team.getTeam_tasks());
        this.events = EventDtoAlt.converter(team.getTeam_events());
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public List<UserDtoAlt> getPeople() {
        return people;
    }

    public List<TaskDtoAlt> getTasks() {
        return tasks;
    }

    public List<EventDtoAlt> getEvents() {
        return events;
    }

    public String getBgColor() {
        return bgColor;
    }

    public static List<TeamDto> converter(List<Team> teams){
        return teams.stream().map(TeamDto::new).collect(Collectors.toList());
    }
}
