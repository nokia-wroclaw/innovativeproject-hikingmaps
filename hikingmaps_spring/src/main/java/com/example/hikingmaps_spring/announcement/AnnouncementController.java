package com.example.hikingmaps_spring.announcement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
	public ResponseEntity<Void> add(@RequestBody Announcement announcement) {
		service.add(announcement);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
}
