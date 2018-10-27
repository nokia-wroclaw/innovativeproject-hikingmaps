package com.example.hikingmaps_spring.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.hikingmaps_spring.user.exceptions.*;

@RestController
@RequestMapping("/user")
public class UserController
{	private UserService service;
	@Autowired
	public UserController(UserService service)
	{	this.service=service;
	}
	@PostMapping("/register")
	public ResponseEntity<Void> register(@RequestBody User user)
	{	try
		{	service.register(user);
			//TODO if no exception thrown - save user to the database and return CREATED status
			return new ResponseEntity<Void>(HttpStatus.NOT_IMPLEMENTED);
		}
		catch(PasswordTooShortException e)
		{
			//TODO PasswordTooShort handling
			return new ResponseEntity<Void>(HttpStatus.NOT_IMPLEMENTED);
		}
		catch(InvalidEmailException e)
		{
			//TODO InvalidEmailException handling
			return new ResponseEntity<Void>(HttpStatus.NOT_IMPLEMENTED);
		}
		catch(UserExistsException e)
		{
			//TODO UserExistsException handling
			return new ResponseEntity<Void>(HttpStatus.NOT_IMPLEMENTED);
		}
		catch(Exception e)
		{	return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
