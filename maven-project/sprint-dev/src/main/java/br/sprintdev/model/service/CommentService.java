package br.sprintdev.model.service;

import br.sprintdev.model.entity.Comment;

import java.util.List;

public interface CommentService {

    void create(Comment comment);

    void update(Comment comment);

    void delete(Long id);

    Comment findById(Long id);

    List<Comment> findAll();

}
