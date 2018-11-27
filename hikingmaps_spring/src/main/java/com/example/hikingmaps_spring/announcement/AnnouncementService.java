package com.example.hikingmaps_spring.announcement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.hikingmaps_spring.announcement.exceptions.AnnouncementDoesnExistException;
import com.example.hikingmaps_spring.user.User;
import com.google.common.collect.Lists;

public class AnnouncementService {
	private AnnouncementRepository repository;
	
	@Autowired
	public AnnouncementService(AnnouncementRepository repository) {
		this.repository = repository;
	}

	public List<Announcement> getAll() {
		return Lists.newArrayList(repository.findAll());
	}

	public void add(Announcement announcement) {
		repository.save(announcement);
	}
	
	public void addUser(User user, long annId) {
		Announcement ann = repository.findById(annId).orElseThrow(AnnouncementDoesnExistException::new);
		ann.getInterested().add(user);
		repository.save(ann);
	}

}
