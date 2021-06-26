package br.sprintdev.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import br.sprintdev.controller.dto.ProjectDto;
import br.sprintdev.controller.form.ProjectForm;
import br.sprintdev.controller.form.UpdateProjectForm;
import br.sprintdev.model.entity.Project;
import br.sprintdev.model.service.ProjectService;
import br.sprintdev.model.service.UserService;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://sprint-dev-git-master-andreybento.vercel.app"})
@RequestMapping("/projects")
public class ProjectController {
	
	@Autowired
	private ProjectService service;
	
	@Autowired
	private UserService userService;

	@GetMapping("/")
	public List<ProjectDto> listAll() {
		List<Project> projects = service.findAll();
		return ProjectDto.converter(projects);
	}
	
	@GetMapping("/{id}")
	public ProjectDto detail(@PathVariable Long id) {
		Project project = service.findById(id);
		return new ProjectDto(project);
	}

	@PostMapping("/add")
	@Transactional
	public ResponseEntity<ProjectDto> create(@RequestBody ProjectForm form, UriComponentsBuilder uriBuilder) {
		Project project = form.convert(userService);
		service.create(project);
	
		URI uri = uriBuilder.path("/projects/{id}").buildAndExpand(project.getId()).toUri();
		
		return ResponseEntity.created(uri).body(new ProjectDto(project));
	}
	
	@PutMapping("/{id}")
	@Transactional
	public ResponseEntity<ProjectDto> update(@PathVariable Long id, @RequestBody UpdateProjectForm form) {
		Project project = form.update(id, service);
		return ResponseEntity.ok(new ProjectDto(project));
	}
	
	@DeleteMapping("/{id}")
	@Transactional
	public ResponseEntity<?> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.ok().build();
	}

}
