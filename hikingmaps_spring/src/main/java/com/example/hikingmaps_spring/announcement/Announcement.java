package com.example.hikingmaps_spring.announcement;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.springframework.format.annotation.DateTimeFormat;

import com.example.hikingmaps_spring.user.User;
import com.fasterxml.jackson.annotation.JsonFormat;

import static java.util.Collections.emptyList;

@Entity
public class Announcement {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@OneToOne
	private User owner;
	private String title;
	private String start;
	private String destination;
	private String description;
	private Date date;
	@OneToMany
	private List<User> interested;

	public Announcement() {

	}

	public Announcement(long id, String title, String start, String destination, String description, Date date) {
		this.id = id;
		this.title = title;
		this.start = start;
		this.destination = destination;
		this.description = description;
		this.date = date;
		interested = emptyList();
	}

	public long getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}

	public String getStart() {
		return start;
	}

	public String getDestination() {
		return destination;
	}

	public String getDescription() {
		return description;
	}

	public Date getDate() {
		return date;
	}

	public void setId(long id) {
		this.id = id;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public void setStart(String start) {
		this.start = start;
	}

	public void setDestination(String destination) {
		this.destination = destination;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public List<User> getInterested() {
		return interested;
	}

	public User getOwner() {
		return owner;
	}

	public void setOwner(User owner) {
		this.owner = owner;
	}
}
