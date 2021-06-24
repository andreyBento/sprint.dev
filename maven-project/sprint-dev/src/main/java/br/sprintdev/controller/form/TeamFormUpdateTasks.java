package br.sprintdev.controller.form;

import br.sprintdev.model.entity.Task;
import br.sprintdev.model.entity.Team;
import br.sprintdev.model.service.TaskService;
import br.sprintdev.model.service.TeamService;

import java.util.List;

public class TeamFormUpdateTasks {

    private Long idTask;

    public Long getIdTask() {
        return idTask;
    }

    public Team convert (Long id, TeamService teamService, TaskService taskService){
        Team team = teamService.findById(id);
        Task task = taskService.findById(this.idTask);

        List<Task> tasks = team.getTeam_tasks();
        for(Task incommingTask:tasks){
            if(!incommingTask.getId().equals(task.getId())){
                tasks.add(task);
            }
        }

        return team;
    }
}
