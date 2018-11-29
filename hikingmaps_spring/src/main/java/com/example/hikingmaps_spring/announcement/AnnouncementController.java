package com.example.hikingmaps_spring.announcement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sec/ann")
public class AnnouncementController {
	private AnnouncementService service;

	@Autowired
	public AnnouncementController(AnnouncementService service) {
		this.service = service;
	}
	
	@GetMapping("/all")
	public ResponseEntity<List<Announcement>> getAll() {
		return new ResponseEntity<>(service.getAll(), HttpStatus.OK);
	}
	
	@PostMapping("/add")
	public ResponseEntity<Void> add(Authentication authentication, @RequestBody Announcement announcement) {
		service.add(authentication.getName(), announcement);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping("/interest")
	public ResponseEntity<Void> interest(Authentication authentication, @RequestParam long annId) {
		service.interest(authentication.getName(), annId);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
}
