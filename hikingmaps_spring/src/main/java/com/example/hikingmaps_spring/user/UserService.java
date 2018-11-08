package com.example.hikingmaps_spring.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.TransactionSystemException;

import com.example.hikingmaps_spring.user.exceptions.*;
@Configuration
public class UserService {
	private final UserRepository repository;
	@Autowired
	public UserService(UserRepository repository)
	{	this.repository=repository;
	}
	public void register(User user) throws PasswordTooShortException, UserExistsException, InvalidEmailException, MissingCredentialsException
	{	if( user.getPassword()==null
			 ||user.getLogin()==null
			 ||user.getEmail()==null)
			throw new MissingCredentialsException();
		if(user.getPassword().length()<8)
			throw new PasswordTooShortException();
		for(User u: repository.findAll())
			if(u.getLogin().equals(user.getLogin()))
				throw new UserExistsException();
		try
		{	this.repository.save(user);
		}
		catch(TransactionSystemException e)
		{	throw new InvalidEmailException();
		}
	}
}
