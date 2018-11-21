package com.example.hikingmaps_spring.user;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
	Optional<User> findByLogin(String login);
}
