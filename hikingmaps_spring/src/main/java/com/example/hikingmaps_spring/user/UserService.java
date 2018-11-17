package com.example.hikingmaps_spring.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.TransactionSystemException;

import com.example.hikingmaps_spring.user.exceptions.*;

@Configuration
public class UserService {
	private final UserRepository repository;
	private final BCryptPasswordEncoder encoder;

	@Autowired
	public UserService(UserRepository repository, BCryptPasswordEncoder encoder) {
		this.repository = repository;
		this.encoder = encoder;
	}

	public void register(User user) {
		if (user.getPassword() == null || user.getLogin() == null || user.getLogin().length() == 0
				|| user.getEmail() == null || user.getEmail().length() == 0)
			throw new MissingCredentialsException();
		if (user.getPassword().length() < 8)
			throw new PasswordTooShortException();
		user.setPassword(encoder.encode(user.getPassword()));
		if (repository.findByLogin(user.getLogin()) != null)
			throw new UserExistsException();
		try {
			this.repository.save(user);
		} catch (TransactionSystemException e) {
			throw new InvalidEmailException();
		}
	}
}
