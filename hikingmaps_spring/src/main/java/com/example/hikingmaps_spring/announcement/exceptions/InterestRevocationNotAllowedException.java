package com.example.hikingmaps_spring.announcement.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "Interest cannot be revoked - already rejected")
public class InterestRevocationNotAllowedException  extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8925996999801387434L;
}
