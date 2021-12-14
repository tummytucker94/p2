package com.revature.project2.service;

import com.revature.project2.entities.User;
import com.revature.project2.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImp implements UserService{

    @Autowired
    private UserRepository repository;

    @Override
    public List<User> getAllUsers() {
        return repository.findAll();
    }

    @Override
    public User getUserById(Long id) {
        return repository.getById(id);
    }

    @Override
    public User saveUser(User user) {
        return repository.save(user);
    }

    @Override
    public User updateUser(Long id ,User updateUser) {
        User userdb = repository.findById(id).get();
        userdb.setEmail(updateUser.getEmail());
        userdb.setFirstName(updateUser.getFirstName());
        userdb.setLastName(updateUser.getLastName());
        userdb.setPassword(updateUser.getPassword());
        userdb.setFocusTime(updateUser.getFocusTime());
        userdb.setBreakTime(updateUser.getBreakTime());
        userdb.setSessionsCompleted(updateUser.getSessionsCompleted());
        userdb.setSegmentsCompleted(updateUser.getSegmentsCompleted());
        return repository.save(userdb);
    }

    @Override
    public User getUserFromCredentials(User user) {
        return repository.findByEmailAndPassword(user.getEmail(), user.getPassword());
    }
}
