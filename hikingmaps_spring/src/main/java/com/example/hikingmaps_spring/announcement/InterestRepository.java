package com.example.hikingmaps_spring.announcement;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import com.example.hikingmaps_spring.user.User;

public interface InterestRepository extends CrudRepository<Interest, Long> {
	public List<Interest> findByAnnouncement(Announcement announcement);
	public List<Interest> findByUser(User user);
	@Transactional
	public void deleteByAnnouncement(Announcement announcement);

}
