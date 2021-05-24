package br.sprintdev.controller.form;

import br.sprintdev.model.entity.User;
import br.sprintdev.model.service.UserService;

public class UpdateUserOnlineForm {

    private Boolean online;

    public Boolean getOnline() {
        return online;
    }

    public void setOnline(Boolean online) {
        this.online = online;
    }

    public User update(Long id, UserService service) {
        User user = service.findById(id);
        user.setOnline(online);
        return user;
    }
}
