package com.example.hikingmaps_spring.route;

import com.example.hikingmaps_spring.user.User;
import com.example.hikingmaps_spring.user.UserService;
import com.example.hikingmaps_spring.user.exceptions.UserDoesntExistException;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.hikingmaps_spring.route.exceptions.*;

import java.util.List;

@Service
public class RouteService {
    private RouteRepository repository;
    private UserService userService;

    @Autowired
    public RouteService(RouteRepository repository, UserService userService) {
        this.repository = repository;
        this.userService = userService;
    }

    public List<Route> getAll() {
        return Lists.newArrayList(repository.findAll());
    }

    public void addRoute(String modifier, Route route) {
        User user = userService.getByLogin(modifier).orElseThrow(UserDoesntExistException::new);
        if(user.isAdmin()) {
            repository.save(route);
        } else {
            throw new AdminPermissionsRequiredException();
        }
    }

    public void deleteRoute(String modifier, long routeId) {
        User user = userService.getByLogin(modifier).orElseThrow(UserDoesntExistException::new);
        if(user.isAdmin()) {
            if(repository.existsById(routeId)) {
                repository.deleteById(routeId);
            } else {
                throw new RouteDoesntExistException();
            }
        } else {
            throw new AdminPermissionsRequiredException();
        }
    }
}
