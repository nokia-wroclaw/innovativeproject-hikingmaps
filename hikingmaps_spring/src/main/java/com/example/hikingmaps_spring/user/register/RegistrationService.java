package com.example.hikingmaps_spring.user.register;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
@Configuration
public class RegistrationService {
	public ResponseEntity<RegistrationResponse> register(RegistrationData data)
	{	return new ResponseEntity<RegistrationResponse>(new RegistrationResponse(String.format("registration request with data %s, %s, %s, %s received, but not fully handled yet", data.getLogin(), data.getPassword(), data.getEmail(), data.getPhoneNumber())),HttpStatus.NOT_IMPLEMENTED);
	}
}
