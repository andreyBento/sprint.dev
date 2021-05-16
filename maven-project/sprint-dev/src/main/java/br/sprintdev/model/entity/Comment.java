package br.sprintdev.model.entity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@SuppressWarnings("serial")
@Entity
@Table(name="COMMENTS")
public class Comment extends AbstractEntity<Long> {

    @NotNull
    private String msg;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "comment_task_id")
    private Task task;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "comment_user_id")
    private User user;

    @NotNull
    private String date;

    private String updatedDate;

    private String status;

    public Comment() {

    }

    public Comment(String msg, String date, User user, Task task) {
        this.msg = msg;
        this.date = date;
        this.user = user;
        this.task = task;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(String updatedDate) {
        this.updatedDate = updatedDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
