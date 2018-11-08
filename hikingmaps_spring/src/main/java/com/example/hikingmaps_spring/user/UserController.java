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
			return new ResponseEntity<Void>(HttpStatus.CREATED);
		}
		catch(PasswordTooShortException e)
		{	return new ResponseEntity<Void>(HttpStatus.NOT_ACCEPTABLE);
		}
		catch(InvalidEmailException e)
		{	return new ResponseEntity<Void>(HttpStatus.NOT_ACCEPTABLE);
		}
		catch(MissingCredentialsException e)
		{	return new ResponseEntity<Void>(HttpStatus.NOT_ACCEPTABLE);
		}
		catch(UserExistsException e)
		{	return new ResponseEntity<Void>(HttpStatus.CONFLICT);
		}
		catch(Exception e)//in case something unexpected happens
		{	return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
