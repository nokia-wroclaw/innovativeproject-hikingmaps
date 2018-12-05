package com.example.hikingmaps_spring.announcement;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.example.hikingmaps_spring.user.User;

@Entity
public class Interest {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@OneToOne
	private User user;
	@OneToOne
	private Announcement announcement;
	private boolean accepted;

	public Interest() {

	}

	public Interest(User user, Announcement announcement) {
		this.user = user;
		this.announcement = announcement;
		this.accepted = false;
	}

	public long getId() {
		return id;
	}

	public User getUser() {
		return user;
	}

	public Announcement getAnnouncement() {
		return announcement;
	}

	public void setAccepted(boolean accept) {
		this.accepted = accept;
	}

	public boolean isAccepted() {
		return accepted;
	}
}
