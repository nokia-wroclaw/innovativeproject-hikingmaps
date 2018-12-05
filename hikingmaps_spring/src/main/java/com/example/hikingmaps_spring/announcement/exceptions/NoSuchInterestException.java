package com.example.hikingmaps_spring.announcement.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "No such interest found")
public class NoSuchInterestException  extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -1460870454819641538L;

	
}
