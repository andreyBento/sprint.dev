package br.sprintdev.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import br.sprintdev.controller.dto.SprintDto;
import br.sprintdev.controller.form.SprintForm;
import br.sprintdev.controller.form.UpdateSprintForm;
import br.sprintdev.model.entity.Sprint;
import br.sprintdev.model.service.BoxService;
import br.sprintdev.model.service.SprintService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/sprints")
public class SprintController {
	
	@Autowired
	private SprintService service;
	
	@Autowired
	private BoxService boxService;
	
	@GetMapping("/")
	public List<SprintDto> listAll() {
		List<Sprint> sprints = service.findAll();
		return SprintDto.converter(sprints);
	}
	
	@GetMapping("/{id}")
	public SprintDto detail(@PathVariable Long id) {
		Sprint sprint = service.findById(id);
		return new SprintDto(sprint);
	}
	
	@PostMapping("/add")
	@Transactional
	public ResponseEntity<SprintDto> create(@RequestBody SprintForm form, UriComponentsBuilder uriBuilder) {
		Sprint sprint = form.convert(boxService);
		service.create(sprint);
	
		URI uri = uriBuilder.path("/sprints/{id}").buildAndExpand(sprint.getId()).toUri();
		
		return ResponseEntity.created(uri).body(new SprintDto(sprint));
	}
	
	@PutMapping("/{id}")
	@Transactional
	public ResponseEntity<SprintDto> update(@PathVariable Long id, @RequestBody UpdateSprintForm form) {
		Sprint sprint = form.update(id, service);
		return ResponseEntity.ok(new SprintDto(sprint));
	}
	
	@DeleteMapping("/{id}")
	@Transactional
	public ResponseEntity<?> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.ok().build();
	}

}
