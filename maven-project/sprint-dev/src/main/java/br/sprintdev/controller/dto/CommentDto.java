package br.sprintdev.controller.dto;

import br.sprintdev.model.entity.Comment;
import br.sprintdev.model.entity.User;

import java.util.List;
import java.util.stream.Collectors;

public class CommentDto {

    private String msg;

    private String date;

    private String status;

    private String updatedDate;

    private UserDtoAlt owner;

    public CommentDto(Comment comment) {
        this.msg = comment.getMsg();
        this.date = comment.getDate();
        this.status = comment.getStatus();
        this.updatedDate = comment.getUpdatedDate();
        this.owner = new UserDtoAlt(comment.getUser());
    }

    public String getMsg() {
        return msg;
    }

    public String getDate() {
        return date;
    }

    public String getStatus() {
        return status;
    }

    public String getUpdatedDate() {
        return updatedDate;
    }

    public UserDtoAlt getOwner() {
        return owner;
    }

    public static List<CommentDto> converter(List<Comment> comments) {
        if(comments == null) {
            return null;
        }
        return comments.stream().map(CommentDto::new).collect(Collectors.toList());
    }

}
