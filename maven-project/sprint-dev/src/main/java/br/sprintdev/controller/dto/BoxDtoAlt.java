package br.sprintdev.controller.dto;

import br.sprintdev.model.entity.Box;

import java.util.List;
import java.util.stream.Collectors;

public class BoxDtoAlt {

	private Long id;
	private String name;

	public BoxDtoAlt(Box box) {
		this.id = box.getId();
		this.name = box.getName();
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public static List<BoxDtoAlt> converter(List<Box> boxes) {
		if(boxes == null) {
			return null;
		}
		return boxes.stream().map(BoxDtoAlt::new).collect(Collectors.toList());
	}
	
}
