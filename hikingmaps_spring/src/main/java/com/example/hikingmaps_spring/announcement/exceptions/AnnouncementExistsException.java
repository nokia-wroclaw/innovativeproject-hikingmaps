package com.example.hikingmaps_spring.announcement.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "Announcement with such ID already exists")
public class AnnouncementExistsException  extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 428242091570150018L;
	
}
