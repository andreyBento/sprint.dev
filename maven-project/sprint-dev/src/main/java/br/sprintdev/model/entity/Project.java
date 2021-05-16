package br.sprintdev.model.entity;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@SuppressWarnings("serial")
@Entity
@Table(name="PROJECTS")
public class Project extends AbstractEntity<Long> {
	
	@NotBlank
	private String name;
	
	@NotBlank
	private String bgColor;
	
	private String imgColor;
	
	@NotNull
	@ManyToOne
	@JoinColumn(name = "owner_id")
	private User owner;
	
	@OneToMany(mappedBy = "box_owner")
	private List<Box> boxes;
	
	public Project() {
		
	}

	public Project(@NotBlank String name, @NotBlank String bgColor, @NotNull User owner) {
		super();
		this.name = name;
		this.bgColor = bgColor;
		this.owner = owner;
	}

	public String getBgColor() {
		return bgColor;
	}

	public void setBgColor(String bgColor) {
		this.bgColor = bgColor;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getImgColor() {
		return imgColor;
	}

	public void setImgColor(String imgColor) {
		this.imgColor = imgColor;
	}

	public User getOwner() {
		return owner;
	}

	public void setOwner(User owner) {
		this.owner = owner;
	}

	public List<Box> getBoxes() {
		return boxes;
	}

	public void setBoxes(List<Box> boxes) {
		this.boxes = boxes;
	}
	
}
