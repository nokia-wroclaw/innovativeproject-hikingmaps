package com.example.hikingmaps_spring.hello_world;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {
	@GetMapping("/hello")
	public ResponseEntity<String> hello(@RequestParam String name) {
		return new ResponseEntity<String>(String.format("Hello %s!", name), HttpStatus.OK);
	}
}
