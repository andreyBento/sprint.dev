package br.sprintdev.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import br.sprintdev.controller.dto.BoxDto;
import br.sprintdev.controller.form.BoxForm;
import br.sprintdev.controller.form.UpdateBoxForm;
import br.sprintdev.model.service.BoxService;
import br.sprintdev.model.service.ProjectService;
import br.sprintdev.model.entity.Box;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/boxes")
public class BoxController {

	@Autowired
	private BoxService service;
	
	@Autowired
	private ProjectService projectService;

	@GetMapping("/")
	public List<BoxDto> listAll() {
		List<Box> boxes = service.findAll();
		return BoxDto.converter(boxes);
	}
	
	@GetMapping("/{id}")
	public BoxDto detail(@PathVariable Long id) {
		Box box = service.findById(id);
		return new BoxDto(box);
	}

	@PostMapping("/add")
	@Transactional
	public ResponseEntity<BoxDto> create(@RequestBody BoxForm form, UriComponentsBuilder uriBuilder) {
		Box box = form.convert(projectService);
		service.create(box);
	
		URI uri = uriBuilder.path("/boxes/{id}").buildAndExpand(box.getId()).toUri();
		
		return ResponseEntity.created(uri).body(new BoxDto(box));
	}
	
	@PutMapping("/{id}")
	@Transactional
	public ResponseEntity<BoxDto> update(@PathVariable Long id, @RequestBody UpdateBoxForm form) {
		Box box = form.update(id, service);
		return ResponseEntity.ok(new BoxDto(box));
	}
	
	@DeleteMapping("/{id}")
	@Transactional
	public ResponseEntity<?> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.ok().build();
	}
	
}
