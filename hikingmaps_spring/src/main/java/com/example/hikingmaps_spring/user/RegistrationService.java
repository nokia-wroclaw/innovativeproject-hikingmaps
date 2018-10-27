package com.example.hikingmaps_spring.user;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
@Configuration
public class RegistrationService {
	public ResponseEntity<Void> register(User user)
	{	return new ResponseEntity<Void>(HttpStatus.NOT_IMPLEMENTED);
	}
}
