package br.sprintdev.controller;

import br.sprintdev.controller.dto.CommentDto;
import br.sprintdev.controller.dto.EventDto;
import br.sprintdev.controller.form.EventForm;
import br.sprintdev.controller.form.UpdateCommentForm;
import br.sprintdev.controller.form.UpdateEventForm;
import br.sprintdev.model.entity.Comment;
import br.sprintdev.model.entity.Event;
import br.sprintdev.model.service.EventService;
import br.sprintdev.model.service.SprintService;
import br.sprintdev.model.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/events")
public class EventController {

    @Autowired
    private EventService service;

    @Autowired
    private SprintService sprintService;

    @Autowired
    private TeamService teamService;

    @GetMapping("/")
    public List<EventDto> listAll() {
        List<Event> events = service.findAll();
        return EventDto.converter(events);
    }

    @GetMapping("/{id}")
    public EventDto detail(@PathVariable Long id) {
        Event event = service.findById(id);
        return new EventDto(event);
    }

    @PostMapping("/add")
    @Transactional
    public ResponseEntity<EventDto> create(@RequestBody EventForm form, UriComponentsBuilder uriBuilder) {
        Event event = form.convert(sprintService, teamService);
        service.create(event);

        URI uri = uriBuilder.path("/events/{id}").buildAndExpand(event.getId()).toUri();

        return ResponseEntity.created(uri).body(new EventDto(event));
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<EventDto> update(@PathVariable Long id, @RequestBody UpdateEventForm form) {
        Event event = form.update(id, service);
        return ResponseEntity.ok(new EventDto(event));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }

}
