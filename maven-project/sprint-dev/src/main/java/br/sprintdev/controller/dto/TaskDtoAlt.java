package br.sprintdev.controller.dto;

import br.sprintdev.model.entity.Task;

import java.util.List;
import java.util.stream.Collectors;

public class TaskDtoAlt {
    private Long id;
    private String name;
    private String msg;
    private String status;
    private String priority;

    public Long getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    public String getMsg() { return msg; }
    public String getStatus() {
        return status;
    }
    public String getPriority() {
        return priority;
    }

    public TaskDtoAlt(Task task) {
        this.id = task.getId();
        this.name = task.getName();
        this.msg = task.getMsg();
        this.status = task.getStatus();
        this.priority = task.getPriority();
    }

    public static List<TaskDtoAlt> converter(List<Task> tasksP) {
        if(tasksP == null) {
            return null;
        }
        return tasksP.stream().map(TaskDtoAlt::new).collect(Collectors.toList());
    }
}
