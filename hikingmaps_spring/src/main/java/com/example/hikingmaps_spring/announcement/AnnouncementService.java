package com.example.hikingmaps_spring.announcement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hikingmaps_spring.announcement.exceptions.AnnouncementDoesnExistException;
import com.example.hikingmaps_spring.announcement.exceptions.AnnouncementOwnerMismatchException;
import com.example.hikingmaps_spring.user.User;
import com.example.hikingmaps_spring.user.UserService;
import com.example.hikingmaps_spring.user.exceptions.UserDoesntExistException;
import com.google.common.collect.Lists;

@Service
public class AnnouncementService {
	private AnnouncementRepository repository;
	private UserService userService;

	@Autowired
	public AnnouncementService(AnnouncementRepository repository, UserService userService) {
		this.repository = repository;
		this.userService = userService;
	}

	public List<Announcement> getAll() {
		return Lists.newArrayList(repository.findAll());
	}

	public void add(String owner, Announcement announcement) {
		User user = userService.getByLogin(owner).orElseThrow(UserDoesntExistException::new);
		announcement.setOwner(user);
		repository.save(announcement);
	}

	public void edit(String username, Announcement annToEdit) {
		Optional<User> optUser = userService.getByLogin(username);
		User user = optUser.orElseThrow(UserDoesntExistException::new);
		Optional<Announcement> optAnn = repository.findById(annToEdit.getId());
		Announcement ann = optAnn.orElseThrow(AnnouncementDoesnExistException::new);
		if (user.getId() != ann.getOwner().getId())
			throw new AnnouncementOwnerMismatchException();
		annToEdit.setOwner(ann.getOwner());
		repository.save(annToEdit);
	}

	public void delete(String username, long annId) {
		Optional<User> optUser = userService.getByLogin(username);
		User user = optUser.orElseThrow(UserDoesntExistException::new);
		Optional<Announcement> optAnn = repository.findById(annId);
		Announcement ann = optAnn.orElseThrow(AnnouncementDoesnExistException::new);
		if (user.getId() != ann.getOwner().getId())
			throw new AnnouncementOwnerMismatchException();
		repository.delete(ann);

	}

	public void interest(String username, long annId) {
		Optional<User> optUser = userService.getByLogin(username);
		User user = optUser.orElseThrow(UserDoesntExistException::new);
		addUser(user, annId);
	}

	public void addUser(User user, long annId) {
		Announcement ann = repository.findById(annId).orElseThrow(AnnouncementDoesnExistException::new);
		ann.getInterested().add(user);
		repository.save(ann);
	}

}
