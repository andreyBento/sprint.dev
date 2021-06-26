package br.sprintdev.controller;

import java.net.URI;
import java.util.List;

import br.sprintdev.controller.form.UpdateUserOnlineForm;
import br.sprintdev.controller.form.UpdateUserPasswordForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import br.sprintdev.model.service.UserService;
import br.sprintdev.controller.dto.UserDto;
import br.sprintdev.controller.dto.UserDtoAlt;
import br.sprintdev.controller.form.UpdateUserForm;
import br.sprintdev.controller.form.UserForm;
import br.sprintdev.model.entity.User;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://sprint-dev-git-master-andreybento.vercel.app"})
@RequestMapping("/users")
public class UserController {

	@Autowired
	private UserService service;

	@GetMapping("/")
	public List<UserDto> listAll() {
		List<User> users = service.findAll();
		return UserDto.converter(users);
	}

	@GetMapping("/{id}")
	public UserDto detail(@PathVariable Long id) {
		User user = service.findById(id);
		return new UserDto(user);
	}

	@PostMapping("/add")
	@Transactional
	public ResponseEntity<UserDtoAlt> create(@RequestBody UserForm form, UriComponentsBuilder uriBuilder) {
		User user = form.convert();
		service.create(user);
		
		URI uri = uriBuilder.path("/users/{id}").buildAndExpand(user.getId()).toUri();
		
		return ResponseEntity.created(uri).body(new UserDtoAlt(user));
	}
	
	@PutMapping("/{id}")
	@Transactional
	public ResponseEntity<UserDto> update(@PathVariable Long id, @RequestBody UpdateUserForm form) {
		User user = form.update(id, service);
		return ResponseEntity.ok(new UserDto(user));
	}

	@PutMapping("/{id}/password")
	@Transactional
	public ResponseEntity<UserDto> update(@PathVariable Long id, @RequestBody UpdateUserPasswordForm form) {
		User user = form.update(id, service);
		return ResponseEntity.ok(new UserDto(user));
	}

	@PutMapping("/{id}/online")
	@Transactional
	public ResponseEntity<UserDto> updateOnline(@PathVariable Long id, @RequestBody UpdateUserOnlineForm form) {
		User user = form.update(id, service);
		return ResponseEntity.ok(new UserDto(user));
	}
	
	@DeleteMapping("/{id}")
	@Transactional
	public ResponseEntity<?> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.ok().build();
	}
}
