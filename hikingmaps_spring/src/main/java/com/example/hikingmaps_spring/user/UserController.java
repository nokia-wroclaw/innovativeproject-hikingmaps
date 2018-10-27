package com.example.hikingmaps_spring.user;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController
{	private RegistrationService service;
	@Autowired
	public UserController(RegistrationService service)
	{	this.service=service;
	}
	@PostMapping("/user/register")
	public ResponseEntity<Void> register(@RequestBody User user)
	{	return new ResponseEntity<Void>(this.service.register(user));
	}
}
