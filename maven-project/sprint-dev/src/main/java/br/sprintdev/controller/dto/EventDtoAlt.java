package br.sprintdev.controller.dto;

import br.sprintdev.model.entity.Event;

import java.util.List;
import java.util.stream.Collectors;

public class EventDtoAlt {

    private Long id;
    private String name;
    private String msg;
    private String date;

    public EventDtoAlt(Event event) {
        this.id = event.getId();
        this.name = event.getName();
        this.msg = event.getMsg();
        this.date = event.getDate();
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

    public static List<EventDtoAlt> converter(List<Event> events) {
        if(events == null) {
            return null;
        }
        return events.stream().map(EventDtoAlt::new).collect(Collectors.toList());
    }

}
