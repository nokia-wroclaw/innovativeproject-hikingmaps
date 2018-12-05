package com.example.hikingmaps_spring.announcement.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "Announcement owner mismatches the authenticated user")
public class AnnouncementOwnerMismatchException  extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -663261400603230587L;
}
