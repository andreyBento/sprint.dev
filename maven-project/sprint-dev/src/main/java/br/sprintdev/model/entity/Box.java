package br.sprintdev.model.entity;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

@SuppressWarnings("serial")
@Entity
@Table(name="BOXES")
public class Box extends AbstractEntity<Long> {
	
	@NotBlank
	private String name;
	
	@ManyToOne
	@JoinColumn(name = "box_owner_id")
	private Project box_owner;
	
	@OneToMany(mappedBy = "sprint_owner")
	private List<Sprint> sprints;

	public Box() {

	}
	
	public Box(String name, Project project) {
		this.name = name;
		this.box_owner = project;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Project getBox_owner() {
		return box_owner;
	}

	public void setBox_owner(Project box_owner) {
		this.box_owner = box_owner;
	}

	public List<Sprint> getSprints() {
		return sprints;
	}

	public void setSprints(List<Sprint> sprints) {
		this.sprints = sprints;
	}

}
