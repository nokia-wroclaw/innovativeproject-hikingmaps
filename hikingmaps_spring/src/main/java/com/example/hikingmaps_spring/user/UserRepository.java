package com.example.hikingmaps_spring.user;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
	User findByLogin(String login);
}
