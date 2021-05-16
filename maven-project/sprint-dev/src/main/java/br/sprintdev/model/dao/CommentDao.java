package br.sprintdev.model.dao;

import br.sprintdev.model.entity.Comment;

import java.util.List;

public interface CommentDao {

    void save(Comment comment);

    void update(Comment comment);

    void delete(Long id);

    Comment findById(Long id);

    List<Comment> findAll();

}
