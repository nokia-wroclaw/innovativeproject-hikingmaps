package com.example.hikingmaps_spring.route;

import com.example.hikingmaps_spring.user.User;
import com.example.hikingmaps_spring.user.UserService;
import com.example.hikingmaps_spring.user.exceptions.UserDoesntExistException;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.hikingmaps_spring.route.exceptions.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RouteService {
    private RouteRepository repository;
    private UserService userService;

    @Autowired
    public RouteService(RouteRepository repository, UserService userService) {
        this.repository = repository;
        this.userService = userService;
    }

    public List<Route> getAll_() {
        return Lists.newArrayList(repository.findAll());
    }

    public List<Route> getAll() {
        List<Route> routeList = new ArrayList<Route>();
        Route route;
        for (Route rt : repository.findAll()) {
            route = new Route(rt);
            routeList.add(route);
        }
        return routeList;
    }

    public Optional<Route> getRouteByID_(long routeId) {
        if(repository.existsById(routeId)) {
            Optional<Route> route = repository.findById(routeId);
            return route;
        } else {
            throw new RouteDoesntExistException();
        }
    }

    public Route getRouteByID(long routeId) {
        Optional<Route> optRoute = repository.findById(routeId);
        Route route = optRoute.orElseThrow(RouteDoesntExistException::new);
        return route;
    }

    public void addRoute(String modifier, Route route) {
        User user = userService.getByLogin(modifier).orElseThrow(UserDoesntExistException::new);
        if(user.isAdmin()) {
            repository.save(route);
        } else {
            throw new AdminPermissionsRequiredException();
        }
    }

    public void editRoute(String modifier, Route routeEdit) {
        Optional<User> optUser = userService.getByLogin(modifier);
        User user = optUser.orElseThrow(UserDoesntExistException::new);
        if(user.isAdmin()) {
            if(repository.existsById(routeEdit.getId())) {
                repository.save(routeEdit);
            } else {
                throw new RouteDoesntExistException();
            }
        } else {
            throw new AdminPermissionsRequiredException();
        }
    }

    public void deleteRoute(String modifier, long routeId) {
        Optional<User> optUser = userService.getByLogin(modifier);
        User user = optUser.orElseThrow(UserDoesntExistException::new);
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
