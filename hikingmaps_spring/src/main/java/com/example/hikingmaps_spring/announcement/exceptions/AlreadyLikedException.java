package com.example.hikingmaps_spring.announcement.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "Announcement already liked")
public class AlreadyLikedException  extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -1175675343639813214L;
	
}
