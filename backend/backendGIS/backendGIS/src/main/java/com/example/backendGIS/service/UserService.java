package com.example.backendGIS.service;

import com.example.backendGIS.entity.User;
import com.example.backendGIS.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

public class UserService {
    @Autowired
    private UserRepository userRepository;

//    @Autowired
//    private BcryptPasswordEncoder passwordEncoder;

    // CREATE USER
    // IF THE USERNAME ALREADY EXISTS WE THROW ERROR
    public User create(User user){
        Optional<User> existingUser = userRepository.findById(user.getId());
        if(existingUser.isPresent()){
            throw new IllegalStateException("The user does not exist");
        }
        return userRepository.save(user);
    }
    //GET USER
    public User getUser(User user){
        Optinal
    }

}
