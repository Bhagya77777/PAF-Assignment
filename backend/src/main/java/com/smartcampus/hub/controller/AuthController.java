package com.smartcampus.hub.controller;

import com.smartcampus.hub.dto.AuthRequest;
import com.smartcampus.hub.dto.AuthResponse;
import com.smartcampus.hub.dto.GoogleAuthRequest;
import com.smartcampus.hub.model.User;
import com.smartcampus.hub.repository.UserRepository;
import com.smartcampus.hub.security.JwtUtil;
import com.smartcampus.hub.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    
    @Autowired
    private AuthService authService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody User user) {
        user.setRole("STUDENT"); // Force STUDENT role
        User savedUser = authService.register(user);
        String token = jwtUtil.generateToken(savedUser.getEmail());
        return ResponseEntity.ok(new AuthResponse(token, savedUser));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@jakarta.validation.Valid @RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
        );

        if (authentication.isAuthenticated()) {
            String token = jwtUtil.generateToken(authRequest.getEmail());
            User user = userRepository.findByEmail(authRequest.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            return ResponseEntity.ok(new AuthResponse(token, user));
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestBody GoogleAuthRequest request) {
        try {
            System.out.println("Received Google Login Request with token: " + request.getToken().substring(0, 10) + "...");
            
            RestTemplate restTemplate = new RestTemplate();
            String url = "https://www.googleapis.com/oauth2/v3/userinfo?access_token=" + request.getToken();
            
            @SuppressWarnings("unchecked")
            Map<String, Object> userInfo = restTemplate.getForObject(url, Map.class);
            
            if (userInfo == null || userInfo.get("email") == null) {
                System.out.println("Google UserInfo returned null or no email.");
                return ResponseEntity.status(401).body("Invalid Google Token or unable to fetch user info");
            }

            String email = (String) userInfo.get("email");
            String name = (String) userInfo.get("name");
            System.out.println("Google Auth success for email: " + email);

            Optional<User> existingUser = userRepository.findByEmail(email);
            User user;
            if (existingUser.isPresent()) {
                user = existingUser.get();
                System.out.println("Existing user found in database.");
            } else {
                System.out.println("New user detected. Registering as STUDENT.");
                // Register new Google user as STUDENT
                user = new User();
                user.setEmail(email);
                user.setName(name);
                user.setPassword("GOOGLE_AUTH_USER"); // Placeholder
                user.setRole("STUDENT");
                user = authService.register(user);
            }

            String jwtToken = jwtUtil.generateToken(email);
            System.out.println("JWT Generated successfully.");
            return ResponseEntity.ok(new AuthResponse(jwtToken, user));

        } catch (Exception e) {
            System.err.println("Google Authentication Exception: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(401).body("Google Authentication Failed: " + e.getMessage());
        }
    }
}
