package br.sprintdev.controller.dto;

import br.sprintdev.model.entity.User;

import java.util.List;
import java.util.stream.Collectors;

public class WorkerDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String username;
    private String bgColor;

    private WorkerDto(User user) {
        this.id = user.getId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.username = user.getUsername();
        this.bgColor = user.getBgColor();
    }

    public Long getId() {
        return id;
    }
    public String getFirstName() {
        return firstName;
    }
    public String getLastName() {
        return lastName;
    }
    public String getUsername() {
        return username;
    }
    public String getBgColor() {
        return bgColor;
    }

    public static List<WorkerDto> converter(List<User> users) {
        return users.stream().map(WorkerDto::new).collect(Collectors.toList());
    }
}
