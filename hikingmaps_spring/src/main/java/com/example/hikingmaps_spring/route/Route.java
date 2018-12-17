package com.example.hikingmaps_spring.route;

import com.fasterxml.jackson.annotation.JsonProperty;
import javax.persistence.*;

@Entity
public class Route {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private long id;
    private String points;
    private String distance;

    public Route() {
    }

    public Route(long id, String points, String distance) {
        this.id = id;
        this.points = points;
        this.distance = distance;
    }

    public Route(Route route) {
        this.id = route.id;
        this.points = route.points;
        this.distance = route.distance;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPoints() {
        return points;
    }

    public void setPoints(String points) {
        this.points = points;
    }

    public String getDistance() { return distance; }

    public void setDistance(String distance) { this.distance = distance; }
}
