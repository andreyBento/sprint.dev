package br.sprintdev.controller.dto;

import br.sprintdev.model.entity.Event;

import java.util.List;
import java.util.stream.Collectors;

public class EventDto {

    private Long id;
    private String name;
    private String msg;
    private String date;
    private List<TeamDtoAlt> teams;

    public EventDto(Event event) {
        this.id = event.getId();
        this.name = event.getName();
        this.msg = event.getMsg();
        this.date = event.getDate();
        this.teams = TeamDtoAlt.converter(event.getTeams());
    }

    public Long getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    public String getMsg() {
        return msg;
    }
    public String getDate() {
        return date;
    }
    public List<TeamDtoAlt> getTeams() {
        return teams;
    }

    public static List<EventDto> converter(List<Event> events) {
        if(events == null) {
            return null;
        }
        return events.stream().map(EventDto::new).collect(Collectors.toList());
    }

}
