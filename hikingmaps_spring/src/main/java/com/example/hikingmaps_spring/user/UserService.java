package com.example.hikingmaps_spring.user;

import org.springframework.context.annotation.Configuration;

import com.example.hikingmaps_spring.user.exceptions.*;
@Configuration
public class UserService {
	public void register(User user) throws PasswordTooShortException, UserExistsException, InvalidEmailException
	{	
		if(user.getPassword().length()<8)
			throw new PasswordTooShortException();
		//TODO check for user existence
		//TODO email address validation
	}
}
