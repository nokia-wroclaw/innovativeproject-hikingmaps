package com.example.hikingmaps_spring.announcement;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.example.hikingmaps_spring.user.User;

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
	private String route;
	private String description;
	private Date date;

	public Announcement() {

	}

	public Announcement(long id, String title, String start, String destination, String route, String description, Date date) {
		this.id = id;
		this.title = title;
		this.start = start;
		this.destination = destination;
		this.route = route;
		this.description = description;
		this.date = date;
	}

	public Announcement(Announcement announcement) {
		this.id = announcement.id;
		this.title = announcement.title;
		this.start = announcement.start;
		this.destination = announcement.destination;
		this.route = announcement.route;
		this.description = announcement.description;
		this.date = announcement.date;
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

	public String getRoute() {
		return route;
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

	public void setRoute(String route) {
		this.route = route;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public User getOwner() {
		return owner;
	}

	public void setOwner(User owner) {
		this.owner = owner;
	}
}
