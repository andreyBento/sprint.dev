package br.sprintdev.controller.form;

import br.sprintdev.model.entity.Comment;
import br.sprintdev.model.entity.User;
import br.sprintdev.model.entity.Task;
import br.sprintdev.model.service.TaskService;
import br.sprintdev.model.service.UserService;

public class CommentForm {

    private String msg;

    private String date;

    private Long idTask;

    private Long idUser;

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

    public Long getIdTask() {
        return idTask;
    }

    public void setIdTask(Long idTask) {
        this.idTask = idTask;
    }

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

    public Comment convert(TaskService taskService, UserService userService) {
        Task task = taskService.findById(idTask);
        User user = userService.findById(idUser);
        return new Comment(msg, date, user, task);
    }
}
