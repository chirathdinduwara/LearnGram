package com.learngram.learngram.controllers;

import com.learngram.learngram.domain.User;
import com.learngram.learngram.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/users")
public class AuthController {

    @Autowired
    private UserService userService;
    

    @GetMapping("/loginSuccess")
    public String loginSuccess(Authentication authentication) {
        if (authentication instanceof OAuth2AuthenticationToken) {
            OAuth2AuthenticationToken oauth2Token = (OAuth2AuthenticationToken) authentication;
            OAuth2User oauth2User = oauth2Token.getPrincipal();
            
            String realName = oauth2User.getAttribute("name");
            String email = oauth2User.getAttribute("email");
            String imageUrl = oauth2User.getAttribute("picture");
    
            // Check if user already exists
            User existingUser = userService.getUserByEmail(email);
            
            if (existingUser == null) {
                // Create a new user
                User newUser = new User();
                newUser.setName(realName);
                newUser.setEmail(email);
                newUser.setImageUrl(imageUrl);
                
                userService.saveUser(newUser);
            }
    
            return realName + " " + email;
        } else {
            return "Not a Google login.";
        }
    }
    
  @PostMapping("/google")
public ResponseEntity<User> saveGoogleUser(@RequestBody User user) {
    User existingUser = userService.getUserByEmail(user.getEmail());

    if (existingUser == null) {
        User newUser = userService.saveUser(user); // Save new user
        return ResponseEntity.ok(newUser);
    } else {
        return ResponseEntity.ok(existingUser); // Return existing user
    }
}

    @PostMapping("/login")
public ResponseEntity<?> loginUser(@RequestBody User loginRequest) {
    String email = loginRequest.getEmail();
    String password = loginRequest.getPassword();

    User user = userService.getUserByEmail(email);

    if (user == null) {
        return ResponseEntity.status(401).body("User not found");
    }

    if (!user.getPassword().equals(password)) {
        return ResponseEntity.status(401).body("Invalid password");
    }

    return ResponseEntity.ok(user);
}


    @PostMapping("/")
    public User createUser(@RequestBody User user) {
        return userService.saveUser(user);
    }


    @GetMapping("/")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }


    @GetMapping("/{id}")
    public User getUserById(@PathVariable String id) {
        return userService.getUserById(id);
    }


    @PutMapping("/{id}")
    public User updateUser(@PathVariable String id, @RequestBody User updatedUser) {
        return userService.updateUser(id, updatedUser);
    }


    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
        return "User deleted with ID: " + id;
    }

    // Follow a user
@PutMapping("/{userId}/follow/{followerId}")
public ResponseEntity<?> followUser(@PathVariable String userId, @PathVariable String followerId) {
    try {
        userService.followUser(userId, followerId);
        return ResponseEntity.ok("User " + followerId + " followed " + userId);
    } catch (Exception e) {
        return ResponseEntity.badRequest().body("Error: " + e.getMessage());
    }
}

// Unfollow a user
@PutMapping("/{userId}/unfollow/{followerId}")
public ResponseEntity<?> unfollowUser(@PathVariable String userId, @PathVariable String followerId) {
    try {
        userService.unfollowUser(userId, followerId);
        return ResponseEntity.ok("User " + followerId + " unfollowed " + userId);
    } catch (Exception e) {
        return ResponseEntity.badRequest().body("Error: " + e.getMessage());
    }
}

// Get followers of a user
@GetMapping("/{userId}/followers")
public ResponseEntity<List<User>> getFollowers(@PathVariable String userId) {
    try {
        List<User> followers = userService.getFollowers(userId);
        return ResponseEntity.ok(followers);
    } catch (Exception e) {
        return ResponseEntity.badRequest().build();
    }
}

}
