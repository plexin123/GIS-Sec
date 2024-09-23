package com.example.backendGIS.service;
import org.springframework.dao.DataAccessException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.example.backendGIS.entity.User;
import com.example.backendGIS.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.InvalidIsolationLevelException;

import java.util.Optional;

public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder encoder;


    // CREATE USER
    // IF THE USERNAME ALREADY EXISTS WE THROW ERROR
    public User create(User user){
        Optional<User> existingUser = userRepository.findById(user.getId());
        if(existingUser.isPresent()){
            throw new IllegalStateException("The username already exists");
        }
        user.setPassword(encoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
    //GET USER
    public User getUser(String username, String password){
        try {
            Optional<User> user = userRepository.findByUsername(username);
            User actualUser =  user.get();
            if (user == null) {
                throw new IllegalStateException("The usernam is incorrect");
            }
            if (!encoder.matches(password, actualUser.getPassword())) {
                throw new IllegalStateException("The password is incorrect");
            }
            return actualUser;
        }
        catch (DataAccessException e){
            throw new RuntimeException("Database error ocurred while trying to retrieve the user", e);
        }

    }
    //UPDATE
    public User updateUser(Long id,String password){
        try{
            Optional<User> user =  userRepository.findById(id);
            if(!user.isPresent()){
                throw new IllegalStateException("The user does not exist");
            }
            User actualUser = user.get();
            actualUser.setPassword(encoder.encode(password));
            return userRepository.save(actualUser);
        }
        catch (DataAccessException e){
            throw new RuntimeException("Database error ocurred while trying to retrive the user", e);
        }
    }

    //DELETE
    public void deleteUser(User user){
        try {
            Optional<User> optionalUser = userRepository.findByUsername(user.getUsername());
            if (!optionalUser.isPresent()) {
                throw new InvalidIsolationLevelException("The user that you want to eliminate does not exist");
            }
            userRepository.delete(user);
        }
        catch(DataAccessException e){
            throw new RuntimeException("Database error ocurred while trying to retrieve the user", e);
        }
    }

}
