package br.sprintdev.controller.dto;

import java.util.List;
import java.util.stream.Collectors;

import br.sprintdev.model.entity.Box;

public class BoxDto {
	
	private Long id;
	private String name;
	private List<SprintDto> sprints;
	
	public BoxDto(Box box) {
		this.id = box.getId();
		this.name = box.getName();
		this.sprints = SprintDto.converter(box.getSprints());
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public List<SprintDto> getSprints() {
		return sprints;
	}

	public static List<BoxDto> converter(List<Box> boxes) {
		if(boxes == null) {
			return null;
		}
		return boxes.stream().map(BoxDto::new).collect(Collectors.toList());
	}
	
}
