package br.sprintdev.model.entity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@SuppressWarnings("serial")
@Entity
@Table(name="EVENTS")
public class Event extends AbstractEntity<Long> {

    @NotNull
    private String name;

    @NotNull
    private String msg;

    @NotNull
    private String date;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "event_sprint_id")
    private Sprint sprint;

    public Event(){

    }

    public Event(String name, String msg, String date, Sprint sprint){
        this.name = name;
        this.msg = msg;
        this.date = date;
        this.sprint = sprint;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Sprint getSprint() {
        return sprint;
    }

    public void setSprint(Sprint sprint) {
        this.sprint = sprint;
    }
}
