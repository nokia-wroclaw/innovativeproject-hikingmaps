package com.example.hikingmaps_spring.security;

import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.hikingmaps_spring.user.User;
import com.example.hikingmaps_spring.user.UserRepository;

@Service
public class UserDetailsServiceImplementation implements UserDetailsService {
	private UserRepository userRepository;

	public UserDetailsServiceImplementation(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<User> user = userRepository.findByLogin(username);
		if (user.isPresent()) {
			return new User(user.get().getUsername(), user.get().getPassword());
		} else {
			throw new UsernameNotFoundException(username);
		}
	}
}
