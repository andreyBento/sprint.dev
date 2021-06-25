package br.sprintdev.model.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Table(name="TEAMS")
public class Team extends AbstractEntity<Long> {

    @NotNull
    private String name;

    @NotNull
    private String bgColor;

    @ManyToMany
    private List<User> team_people;

    @ManyToMany
    private List<Sprint> team_sprints;

    @OneToMany(mappedBy = "area")
    private List<Task> team_tasks;

    @ManyToMany
    private List<Event> team_events;

    public Team() {

    }

    public Team(String name, String bgColor) {
        this.name = name;
        this.bgColor = bgColor;
    }

    public Team(String name, String bgColor, List<User> people, List<Sprint> team_sprints) {
        this.name = name;
        this.bgColor = bgColor;
        this.team_people = people;
        this.team_sprints = team_sprints;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<User> getTeam_people() {
        return team_people;
    }

    public void setTeam_people(List<User> team_people) {
        this.team_people = team_people;
    }

    public List<Sprint> getTeam_sprints() {
        return team_sprints;
    }

    public void setTeam_sprints(List<Sprint> team_sprints) {
        this.team_sprints = team_sprints;
    }

    public List<Task> getTeam_tasks() {
        return team_tasks;
    }

    public void setTeam_tasks(List<Task> team_tasks) {
        this.team_tasks = team_tasks;
    }

    public List<Event> getTeam_events() {
        return team_events;
    }

    public void setTeam_events(List<Event> team_events) {
        this.team_events = team_events;
    }

    public String getBgColor() {
        return bgColor;
    }

    public void setBgColor(String bgColor) {
        this.bgColor = bgColor;
    }
}
