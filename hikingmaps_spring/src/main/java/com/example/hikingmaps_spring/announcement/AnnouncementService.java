package com.example.hikingmaps_spring.announcement;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import com.example.hikingmaps_spring.announcement.exceptions.AlreadyLikedException;
import com.example.hikingmaps_spring.announcement.exceptions.AnnouncementDoesnExistException;
import com.example.hikingmaps_spring.announcement.exceptions.AnnouncementOwnerMismatchException;
import com.example.hikingmaps_spring.announcement.exceptions.NoSuchInterestException;
import com.example.hikingmaps_spring.user.User;
import com.example.hikingmaps_spring.user.UserService;
import com.example.hikingmaps_spring.user.exceptions.UserDoesntExistException;

@Service
public class AnnouncementService {
	private AnnouncementRepository announcementRepository;
	private InterestRepository interestRepository;
	private UserService userService;

	@Autowired
	public AnnouncementService(AnnouncementRepository announcementRepository, InterestRepository interestRepository,
			UserService userService) {
		this.announcementRepository = announcementRepository;
		this.interestRepository = interestRepository;
		this.userService = userService;
	}

	public List<Announcement> getAll() {
		List<Announcement> list = new ArrayList<Announcement>();
		Announcement announcement;
		for (Announcement ann : announcementRepository.findAll()) {
			announcement = new Announcement(ann);
			announcement.setOwner(new User(ann.getOwner().getLogin()));
			list.add(announcement);
		}
		return list;
	}

	public List<Pair<Announcement, List<Pair<String, Boolean>>>> getMy(String username) {
		Optional<User> optUser = userService.getByLogin(username);
		User user = optUser.orElseThrow(UserDoesntExistException::new);
		List<Pair<Announcement, List<Pair<String, Boolean>>>> list = new ArrayList<Pair<Announcement, List<Pair<String, Boolean>>>>();
		Announcement announcement;
		List<Pair<String, Boolean>> interestedList;
		for (Announcement ann : announcementRepository.findByOwner(user)) {
			interestedList = new ArrayList<Pair<String, Boolean>>();
			for (Interest i : interestRepository.findByAnnouncement(ann))
				interestedList.add(Pair.of(i.getUser().getLogin(), i.isAccepted()));
			announcement = new Announcement(ann);
			announcement.setOwner(new User(username));
			list.add(Pair.of(announcement, interestedList));
		}
		return list;
	}

	public void add(String owner, Announcement announcement) {
		User user = userService.getByLogin(owner).orElseThrow(UserDoesntExistException::new);
		announcement.setOwner(user);
		announcementRepository.save(announcement);
	}

	public void edit(String username, Announcement annToEdit) {
		Optional<User> optUser = userService.getByLogin(username);
		User user = optUser.orElseThrow(UserDoesntExistException::new);
		Optional<Announcement> optAnn = announcementRepository.findById(annToEdit.getId());
		Announcement ann = optAnn.orElseThrow(AnnouncementDoesnExistException::new);
		if (user.getId() != ann.getOwner().getId())
			throw new AnnouncementOwnerMismatchException();
		annToEdit.setOwner(ann.getOwner());
		announcementRepository.save(annToEdit);
	}

	public void delete(String username, long annId) {
		Optional<User> optUser = userService.getByLogin(username);
		User user = optUser.orElseThrow(UserDoesntExistException::new);
		Optional<Announcement> optAnn = announcementRepository.findById(annId);
		Announcement ann = optAnn.orElseThrow(AnnouncementDoesnExistException::new);
		if (user.getId() != ann.getOwner().getId())
			throw new AnnouncementOwnerMismatchException();
		interestRepository.deleteByAnnouncement(ann);
		announcementRepository.delete(ann);
	}

	public void interest(String username, long annId) {
		Optional<User> optUser = userService.getByLogin(username);
		User user = optUser.orElseThrow(UserDoesntExistException::new);
		Optional<Announcement> optAnn = announcementRepository.findById(annId);
		Announcement ann = optAnn.orElseThrow(AnnouncementDoesnExistException::new);
		for (Interest i : interestRepository.findByAnnouncement(ann))
			if (i.getUser().getId() == user.getId())
				throw new AlreadyLikedException();
		interestRepository.save(new Interest(user, ann));
	}

	public List<Pair<Announcement, Boolean>> myInterests(String username) {
		Optional<User> optUser = userService.getByLogin(username);
		User user = optUser.get();
		List<Pair<Announcement, Boolean>> list = new ArrayList<Pair<Announcement, Boolean>>();
		List<Interest> interestList = interestRepository.findByUser(user);
		Announcement ann;
		for (Interest i : interestList) {
			ann = new Announcement(i.getAnnouncement());
			ann.setOwner(new User(i.getAnnouncement().getOwner().getLogin()));
			list.add(Pair.of(ann, i.isAccepted()));
		}
		return list;
	}

	public void acceptInterest(String requesterName, String username, long annId) {
		Optional<User> optUser = userService.getByLogin(requesterName);
		User requester = optUser.orElseThrow(UserDoesntExistException::new);
		Optional<Announcement> optAnn = announcementRepository.findById(annId);
		Announcement ann = optAnn.orElseThrow(AnnouncementDoesnExistException::new);
		if (requester.getId() != ann.getOwner().getId())
			throw new AnnouncementOwnerMismatchException();
		optUser = userService.getByLogin(username);
		User user = optUser.orElseThrow(UserDoesntExistException::new);
		for (Interest i : interestRepository.findByAnnouncement(ann))
			if (i.getUser().getId() == user.getId()) {
				i.setAccepted(true);
				interestRepository.save(i);
				return;
			}
		throw new NoSuchInterestException();
	}

}
