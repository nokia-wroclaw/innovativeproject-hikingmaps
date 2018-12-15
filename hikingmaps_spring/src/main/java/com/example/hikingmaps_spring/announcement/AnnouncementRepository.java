package com.example.hikingmaps_spring.announcement;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.example.hikingmaps_spring.user.User;

public interface AnnouncementRepository extends CrudRepository<Announcement, Long> {
	public List<Announcement> findByOwner(User user);

}
