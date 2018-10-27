package com.example.hikingmaps_spring.user.register;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class RegistrationController
{	private RegistrationService service;
	@Autowired
	public RegistrationController(RegistrationService service)
	{	this.service=service;
	}
	@PostMapping("/user/register")
	public ResponseEntity<RegistrationResponse> register(@RequestBody RegistrationData data)
	{	return this.service.register(data);
	}
}
