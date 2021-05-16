package br.sprintdev.model.service;

import br.sprintdev.model.dao.CommentDao;
import br.sprintdev.model.entity.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = false)
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentDao dao;

    @Override
    public void create(Comment comment) {
        dao.save(comment);
    }

    @Override
    public void update(Comment comment) {
        dao.update(comment);
    }

    @Override
    public void delete(Long id) {
        dao.delete(id);
    }

    @Override
    public Comment findById(Long id) {
        return dao.findById(id);
    }

    @Override
    public List<Comment> findAll() {
        return dao.findAll();
    }

}
