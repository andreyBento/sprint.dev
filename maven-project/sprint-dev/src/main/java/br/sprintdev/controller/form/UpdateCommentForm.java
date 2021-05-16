package br.sprintdev.controller.form;

import br.sprintdev.model.entity.Comment;
import br.sprintdev.model.service.CommentService;

public class UpdateCommentForm {

    private String msg;
    private String updatedDate;

    public Comment update(Long id, CommentService service){
        Comment comment = service.findById(id);
        comment.setMsg(msg);
        comment.setUpdatedDate(updatedDate);
        return comment;
    }

}
