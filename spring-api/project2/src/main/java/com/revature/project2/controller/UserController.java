package com.revature.project2.controller;

import com.revature.project2.entities.User;
import com.revature.project2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService service;

    @GetMapping("/users")
    public List<User> getUsers(){
        return service.getAllUsers();
    }

    @GetMapping("/users/{id}")
    public User getUser(@PathVariable("id") Long id){
        return service.getUserById(id);
    }

    @PostMapping("/users")
    public User addUser(@RequestBody User user){
        return service.saveUser(user);
    }

    @PutMapping("/users/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user){
        return service.updateUser(id, user);
    }

    @PostMapping("/users/login")
    public User getUserFromCredentials(@RequestBody User user){
        return service.getUserFromCredentials(user);
    }
}
