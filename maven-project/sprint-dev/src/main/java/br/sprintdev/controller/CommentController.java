package br.sprintdev.controller;

import br.sprintdev.controller.dto.CommentDto;
import br.sprintdev.controller.form.CommentForm;
import br.sprintdev.controller.form.UpdateCommentForm;
import br.sprintdev.model.entity.Comment;
import br.sprintdev.model.service.CommentService;
import br.sprintdev.model.service.TaskService;
import br.sprintdev.model.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://sprint-dev-git-master-andreybento.vercel.app"})
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    private CommentService service;

    @Autowired
    private TaskService taskService;

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public List<CommentDto> listAll() {
        List<Comment> comments = service.findAll();
        return CommentDto.converter(comments);
    }

    @GetMapping("/{id}")
    public CommentDto detail(@PathVariable Long id) {
        Comment comment = service.findById(id);
        return new CommentDto(comment);
    }

    @PostMapping("/add")
    @Transactional
    public ResponseEntity<CommentDto> create(@RequestBody CommentForm form, UriComponentsBuilder uriBuilder) {
        Comment comment = form.convert(taskService, userService);
        service.create(comment);

        URI uri = uriBuilder.path("/comments/{id}").buildAndExpand(comment.getId()).toUri();

        return ResponseEntity.created(uri).body(new CommentDto(comment));
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<CommentDto> update(@PathVariable Long id, @RequestBody UpdateCommentForm form) {
        Comment comment = form.update(id, service);
        return ResponseEntity.ok(new CommentDto(comment));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }

}
