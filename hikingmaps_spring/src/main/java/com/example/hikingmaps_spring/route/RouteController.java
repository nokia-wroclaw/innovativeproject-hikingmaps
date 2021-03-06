package com.example.hikingmaps_spring.route;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/route")
class RouteController {
    private RouteService service;

    @Autowired
    public RouteController(RouteService service) {
        this.service = service;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Route>> getAll() {
        return new ResponseEntity<>(service.getAll(), HttpStatus.OK);
    }

    @GetMapping("/getByID")
    public ResponseEntity<Route> getRouteByID(@RequestParam("routeId") long routeId) {
        return new ResponseEntity<>(service.getRouteByID(routeId), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Void> addRoute(Authentication authentication, @RequestBody Route route) {
        service.addRoute(authentication.getName(), route);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/edit")
    public ResponseEntity<Void> editRoute(Authentication authentication, @RequestBody Route route) {
        service.editRoute(authentication.getName(), route);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteRoute(Authentication authentication, @RequestParam("routeId") long routeId) {
        service.deleteRoute(authentication.getName(), routeId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}

@RestController
@RequestMapping("/sec/route")
class RouteControllerUser {
    private RouteService service;

    @Autowired
    public RouteControllerUser(RouteService service) {
        this.service = service;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Route>> getAll() {
        return new ResponseEntity<>(service.getAll(), HttpStatus.OK);
    }


    @GetMapping("/getByID")
    public ResponseEntity<Route> getRouteByID(@RequestParam("routeId") long routeId) {
        return new ResponseEntity<>(service.getRouteByID(routeId), HttpStatus.OK);
    }

}
