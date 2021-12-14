package com.revature.project2.repository;

import com.revature.project2.entities.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class UserRepositoryTest {

    @Autowired
    private UserRepository repository;

    @Test
    public void saveUserTest(){
        //create user to save
        User user =User.builder()
                .firstName("James")
                .lastName("Lavigne")
                .email("jl@gmail.com")
                .password("root")
                .build();

        repository.save(user);
    }

    @Test
    public void findAllUserTest(){
        List<User> users =  repository.findAll();
        for (User user : users) {
            System.out.println(user);
        }
    }
}
