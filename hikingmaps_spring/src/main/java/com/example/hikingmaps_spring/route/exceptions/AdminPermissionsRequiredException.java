package com.example.hikingmaps_spring.route.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "Permission denied (admin only)")
public class AdminPermissionsRequiredException extends RuntimeException {
    private static final long serialVersionUID = 8787;
}
