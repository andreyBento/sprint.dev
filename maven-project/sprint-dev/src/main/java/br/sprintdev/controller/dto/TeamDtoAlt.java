package br.sprintdev.controller.dto;

import br.sprintdev.model.entity.Team;

import java.util.List;
import java.util.stream.Collectors;

public class TeamDtoAlt {

    private Long id;
    private String name;
    private String bgColor;

    public TeamDtoAlt(Team team){
        this.id = team.getId();
        this.name = team.getName();
        this.bgColor = team.getBgColor();
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getBgColor() {
        return bgColor;
    }

    public static List<TeamDtoAlt> converter(List<Team> teams){
        return teams.stream().map(TeamDtoAlt::new).collect(Collectors.toList());
    }
}
