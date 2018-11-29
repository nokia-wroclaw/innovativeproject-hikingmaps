package com.example.hikingmaps_spring.route.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "Route doesnt exist")
public class RouteDoesntExistException extends RuntimeException {
    private static final long serialVersionUID = 8788;
}
