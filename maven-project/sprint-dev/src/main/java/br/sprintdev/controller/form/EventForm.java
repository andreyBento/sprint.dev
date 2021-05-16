package br.sprintdev.controller.form;

import br.sprintdev.model.entity.Event;
import br.sprintdev.model.entity.Sprint;
import br.sprintdev.model.service.SprintService;

public class EventForm {

    private String name;

    private String msg;

    private String date;

    private Long idSprint;

    public Event convert(SprintService service) {
        Sprint sprint = service.findById(idSprint);
        return new Event(name, msg, date, sprint);
    }

}
