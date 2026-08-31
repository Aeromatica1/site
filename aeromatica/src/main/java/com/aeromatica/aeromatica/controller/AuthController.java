package com.aeromatica.aeromatica.controller;

import com.aeromatica.aeromatica.service.AuthService;
import com.aeromatica.aeromatica.service.UserService;
import com.aeromatica.aeromatica.dto.LoginRequest;
import com.aeromatica.aeromatica.dto.LoginResponse;
import com.aeromatica.aeromatica.dto.RegisterRequest;
import com.aeromatica.aeromatica.dto.RegisterResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;
    private final AuthService authService;

    public AuthController(UserService userService, AuthService authService) {
        this.userService = userService;
        this.authService = authService;
    }

    @GetMapping("/register")
    public String registerForm() {
        return "redirect:/register.html";
    }

    @PostMapping("/register")
    @ResponseBody
        public ResponseEntity<RegisterResponse> registerAccount(@Valid @RequestBody RegisterRequest request) {
            RegisterResponse response = userService.registerUser(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/login")
    public String loginForm() {
        return "redirect:/login.html";
    }

    @PostMapping("/login")
    @ResponseBody
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.status(HttpStatus.OK).body(authService.login(request));
    }
}