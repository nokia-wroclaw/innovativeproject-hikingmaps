package com.example.hikingmaps_spring.route;

import com.fasterxml.jackson.annotation.JsonProperty;
import javax.persistence.*;
import java.util.List;

@Entity(name = "Route")
public class Route {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private long id;
    @ElementCollection
    @JsonProperty("points")
    private List<String> points;

    public Route(long id, List<String> points) {
        this.id = id;
        this.points = points;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public List<String> getPoints() {
        return points;
    }

    public void setPoints(List<String> points) {
        this.points = points;
    }
}
