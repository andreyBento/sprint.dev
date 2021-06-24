package br.sprintdev.controller.form;

import br.sprintdev.model.entity.Team;

public class TeamForm {
    private String name;
    private String bgColor;

    public String getName() {
        return name;
    }
    public String getBgColor() {
        return bgColor;
    }

    public Team convert (){
        return new Team(name, bgColor);
    }
}
