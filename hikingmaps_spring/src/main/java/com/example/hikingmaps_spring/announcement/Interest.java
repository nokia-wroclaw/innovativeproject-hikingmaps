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
	private InterestStatus status;

	public Interest() {

	}

	public Interest(User user, Announcement announcement) {
		this.user = user;
		this.announcement = announcement;
		this.status = InterestStatus.PENDING;
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

	public void setStatus(InterestStatus status) {
		this.status = status;
	}

	public InterestStatus status() {
		return status;
	}
}
