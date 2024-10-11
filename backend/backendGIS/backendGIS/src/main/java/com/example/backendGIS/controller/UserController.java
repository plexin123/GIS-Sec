    package com.example.backendGIS.controller;

    import com.example.backendGIS.entity.Group;
    import com.example.backendGIS.entity.User;
    import com.example.backendGIS.repository.UserRepository;
    import com.example.backendGIS.service.UserService;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.data.jpa.repository.Query;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.MediaType;
    import org.springframework.http.ResponseEntity;
    import org.springframework.stereotype.Controller;
    import org.springframework.stereotype.Repository;
    import org.springframework.web.bind.annotation.*;


//    @CrossOrigin(origins = "http://localhost:4200/login") // Allow this origin
@RestController
@RequestMapping(path="api/user",produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
        @Autowired
        private UserService userService;
        @Autowired
        private UserRepository userRepository;

//        @Autowired
//        private User user;

        //Post
        // add JWT Some kind of security verification
        @PostMapping("/login")
        public ResponseEntity<?> getUser(@RequestBody User user) {
           String username = user.getUsername();
           String password = user.getPassword();
           User checkUser = userService.getUser(username, password);
           if(checkUser == null){
               return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
           }
            return ResponseEntity.ok("Login successful");
        }
        @PostMapping("/update/{id}")
        public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User user){
//            String username = user.getUsername();
            if(user == null){
                return  ResponseEntity.badRequest().body("The user cannot be null");            }
            User currentUser = userService.getUserById(id);
            String password = user.getPassword();
            if(password != null && !password.isEmpty()){
                currentUser.setPassword(password);
            }
            Group role = user.getGroup();
            if(role != null){
                currentUser.setGroup(role);
            }
            userService.updateUser(user.getId(), password, role.getId());
            return ResponseEntity.ok("You have successfully updated a new user");
        }
        @PostMapping("/")
        public ResponseEntity<?> createUser(@RequestBody User user) {
            if (user == null) {
                return ResponseEntity.badRequest().body("The user cannot be empty");
            }
            userService.create(user);
            return ResponseEntity.ok("You have created a new user");

        }


     }
