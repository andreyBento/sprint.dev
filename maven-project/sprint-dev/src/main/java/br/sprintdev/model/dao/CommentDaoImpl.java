package br.sprintdev.model.dao;

import br.sprintdev.model.entity.Comment;
import org.springframework.stereotype.Repository;

@Repository
public class CommentDaoImpl extends AbstractDao<Comment, Long> implements CommentDao {

}
