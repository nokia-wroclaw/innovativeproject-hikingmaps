package com.example.hikingmaps_spring.announcement.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "Missing credentials")
public class AnnouncementDoesnExistException  extends RuntimeException {
	private static final long serialVersionUID = 2448422009399130831L;
}
