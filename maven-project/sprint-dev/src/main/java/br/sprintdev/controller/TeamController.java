package br.sprintdev.controller;

import br.sprintdev.controller.dto.TeamDto;
import br.sprintdev.controller.dto.TeamDtoAlt;
import br.sprintdev.controller.form.*;
import br.sprintdev.model.entity.Team;
import br.sprintdev.model.service.SprintService;
import br.sprintdev.model.service.TaskService;
import br.sprintdev.model.service.TeamService;
import br.sprintdev.model.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/teams")
public class TeamController {

    @Autowired
    private TeamService service;

    @Autowired
    private UserService userService;

    @Autowired
    private SprintService sprintService;

    @Autowired
    private TaskService taskService;

    @GetMapping("/")
    public List<TeamDto> listAll() {
        List<Team> teams = service.findAll();
        return TeamDto.converter(teams);
    }

    @GetMapping("/{id}")
    public TeamDto details(@PathVariable Long id) {
        Team team = service.findById(id);
        return new TeamDto(team);
    }

    @PostMapping("/add")
    @Transactional
    public ResponseEntity<TeamDtoAlt> create(@RequestBody TeamForm form, UriComponentsBuilder uriBuilder) {
        Team team = form.convert();
        service.create(team);

        URI uri = uriBuilder.path("/teams/{id}").buildAndExpand(team.getId()).toUri();

        return ResponseEntity.created(uri).body(new TeamDtoAlt(team));
    }

    @PostMapping("/addComplete")
    @Transactional
    public ResponseEntity<TeamDto> createComplete(@RequestBody TeamFormCreateAlt form, UriComponentsBuilder uriBuilder) {
        Team team = form.convert(userService, sprintService);
        service.create(team);

        URI uri = uriBuilder.path("/teams/{id}").buildAndExpand(team.getId()).toUri();

        return ResponseEntity.created(uri).body(new TeamDto(team));
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<TeamDto> addTask(@PathVariable Long id, @RequestBody TeamFormUpdate form) {
        Team team = form.convert(id, service);
        return ResponseEntity.ok(new TeamDto(team));
    }

    @PutMapping("/{id}/taskAdd")
    @Transactional
    public ResponseEntity<TeamDto> addTask(@PathVariable Long id, @RequestBody TeamFormUpdateTasks form) {
        Team team = form.convert(id, service, taskService);
        return ResponseEntity.ok(new TeamDto(team));
    }

    @PutMapping("/{id}/peopleAdd")
    @Transactional
    public ResponseEntity<TeamDto> addTask(@PathVariable Long id, @RequestBody TeamFormUpdatePeople form) {
        Team team = form.convert(id, service, userService);
        return ResponseEntity.ok(new TeamDto(team));
    }

    @PutMapping("/{id}/sprintsAdd")
    @Transactional
    public ResponseEntity<TeamDto> addTask(@PathVariable Long id, @RequestBody TeamFormUpdateSprint form) {
        Team team = form.convert(id, service, sprintService);
        return ResponseEntity.ok(new TeamDto(team));
    }

    @DeleteMapping("/{id}/people")
    @Transactional
    public ResponseEntity<TeamDto> delete(@PathVariable Long id, @RequestBody TeamFormRemovePeople form) {
        Team team = form.convert(id, service);
        return ResponseEntity.ok(new TeamDto(team));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }

}
