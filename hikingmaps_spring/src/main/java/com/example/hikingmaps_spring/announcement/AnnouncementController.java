package com.example.hikingmaps_spring.announcement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
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

	@GetMapping("/my")
	public ResponseEntity<List<Pair<Announcement, List<Pair<String, InterestStatus>>>>> getMy(
			Authentication authentication) {
		return new ResponseEntity<>(service.getMy(authentication.getName()), HttpStatus.OK);
	}

	@GetMapping("/all")
	public ResponseEntity<List<Announcement>> getAll() {
		return new ResponseEntity<>(service.getAll(), HttpStatus.OK);
	}
	
	//TODO details
	/*@GetMapping("/details")
	public ResponseEntity<Announcement> details(@RequestParam("annId") long annId) {
		return new ResponseEntity<Announcement>(service.details(annId), HttpStatus.OK);
	}*/
	

	@PatchMapping("/edit")
	public ResponseEntity<Void> edit(Authentication authentication, @RequestBody Announcement announcement) {
		service.edit(authentication.getName(), announcement);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@DeleteMapping("/delete")
	public ResponseEntity<Void> delete(Authentication authentication, @RequestParam("annId") long annId) {
		service.delete(authentication.getName(), annId);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PostMapping("/add")
	public ResponseEntity<Void> add(Authentication authentication, @RequestBody Announcement announcement) {
		service.add(authentication.getName(), announcement);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PostMapping("/interest")
	public ResponseEntity<Void> interest(Authentication authentication, @RequestParam("annId") long annId) {
		service.interest(authentication.getName(), annId);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	@GetMapping("/interest/my")
	public ResponseEntity<List<Pair<Announcement, InterestStatus>>> myInterests(Authentication authentication) {
		return new ResponseEntity<>(service.myInterests(authentication.getName()), HttpStatus.OK);
	}

	@PostMapping("/interest/accept")
	public ResponseEntity<Void> acceptInterest(Authentication authentication, @RequestParam("username") String username,
			@RequestParam("annId") long annId) {
		service.acceptInterest(authentication.getName(), username, annId);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	@PostMapping("/interest/reject")
	public ResponseEntity<Void> rejectInterest(Authentication authentication, @RequestParam("username") String username,
			@RequestParam("annId") long annId) {
		service.rejectInterest(authentication.getName(), username, annId);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	@PostMapping("/interest/revoke")
	public ResponseEntity<Void> revokeInterest(Authentication authentication, @RequestParam("annId") long annId) {
		service.revokeInterest(authentication.getName(), annId);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

}
