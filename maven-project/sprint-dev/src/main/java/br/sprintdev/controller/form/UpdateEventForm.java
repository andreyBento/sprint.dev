package br.sprintdev.controller.form;

import br.sprintdev.model.entity.Event;
import br.sprintdev.model.service.EventService;

public class UpdateEventForm {

    private String name;
    private String msg;
    private String date;

    public Event update(Long id, EventService service){
        Event comment = service.findById(id);
        comment.setName(name);
        comment.setMsg(msg);
        comment.setDate(date);
        return comment;
    }

}
