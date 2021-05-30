package br.sprintdev.controller;

import java.net.URI;
import java.util.List;

import br.sprintdev.controller.dto.TaskDtoAlt;
import br.sprintdev.model.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import br.sprintdev.controller.dto.TaskDto;
import br.sprintdev.controller.form.TaskForm;
import br.sprintdev.controller.form.UpdateTaskForm;
import br.sprintdev.model.entity.Task;
import br.sprintdev.model.service.SprintService;
import br.sprintdev.model.service.TaskService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/tasks")
public class TaskController {
	
	@Autowired
	private TaskService service;
	
	@Autowired
	private SprintService sprintService;

	@Autowired
	private UserService userService;
	
	@GetMapping("/")
	public List<TaskDto> listAll() {
		List<Task> tasksP = service.findAll();
		return TaskDto.converter(tasksP);
	}
	
	@GetMapping("/{id}")
	public TaskDto detail(@PathVariable Long id) {
		Task task = service.findById(id);
		return new TaskDto(task);
	}
	
	@PostMapping("/add")
	@Transactional
	public ResponseEntity<TaskDtoAlt> create(@RequestBody TaskForm form, UriComponentsBuilder uriBuilder) {
		Task task = form.convert(sprintService);
		service.create(task);
	
		URI uri = uriBuilder.path("/tasks/{id}").buildAndExpand(task.getId()).toUri();
		
		return ResponseEntity.created(uri).body(new TaskDtoAlt(task));
	}
	
	@PutMapping("/{id}")
	@Transactional
	public ResponseEntity<TaskDto> update(@PathVariable Long id, @RequestBody UpdateTaskForm form) {
		Task task = form.update(id, service, userService);
		return ResponseEntity.ok(new TaskDto(task));
	}
	
	@DeleteMapping("/{id}")
	@Transactional
	public ResponseEntity<?> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.ok().build();
	}

}
