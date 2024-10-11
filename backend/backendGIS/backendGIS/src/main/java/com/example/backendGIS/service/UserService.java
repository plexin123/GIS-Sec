package com.example.backendGIS.service;
import com.example.backendGIS.entity.Group;
import com.example.backendGIS.repository.GroupRepository;
import org.springframework.dao.DataAccessException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.example.backendGIS.entity.User;
import com.example.backendGIS.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.InvalidIsolationLevelException;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder encoder;
    @Autowired
    private GroupRepository groupRepository;



    // CREATE USER
    // IF THE USERNAME ALREADY EXISTS WE THROW ERROR
    //Second iteration
    public User create(User user){
        Optional<User> existingUser = userRepository.findByUsername(user.getUsername());
        if(existingUser.isPresent()){
            throw new IllegalStateException("The username already exists");
        }
        user.setPassword(encoder.encode(user.getPassword()));
        //set the respective role in the database;

        return userRepository.save(user);
    }
    //GET USER
    public User getUser(String username, String password) {
        try {
            Optional<User> user = userRepository.findByUsername(username);

            // Check if the user exists
            if (!user.isPresent()) {
                throw new IllegalStateException("The username is incorrect");
            }

            User actualUser = user.get();

            // Check if the password matches the hashed password
            if (!encoder.matches(password, actualUser.getPassword())) {
                throw new IllegalStateException("The password is incorrect");
            }

            // Return the authenticated user
            return actualUser;

        } catch (DataAccessException e) {
            throw new RuntimeException("Database error occurred while trying to retrieve the user", e);
        }
    }


    //GET USER BY ID
    public User getUserById(Long id){
        try {
            Optional<User> user = userRepository.findById(id);
            User actualUser = user.get();
            if(!user.isPresent()){
                throw new IllegalStateException("The username does not exist");
            }
            return actualUser;

        }
        catch (Exception e){
            throw new RuntimeException("Database error ocurred while trying to retrieve the user ", e);
        }
    }
    //UPDATE
    //HOW WOULD I UPDATE THE CURRENT USER ITS ROLE
    // Create a new group repo to access data then get/set of group type in user class;
    public User updateUser(Long id,String password, Long group_id){
        try{
            Optional<User> user =  userRepository.findById(id);
            if(!user.isPresent()){
                throw new IllegalStateException("The user does not exist");
            }
            Optional<Group> group = groupRepository.findById(group_id);
            if(!group.isPresent()){
                throw new IllegalStateException("Select a group you cannot leave it empty");
            }
            Group actualGroup = group.get();
            User actualUser = user.get();
            actualUser.setPassword(encoder.encode(password));
            actualUser.setGroup(actualGroup);
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
