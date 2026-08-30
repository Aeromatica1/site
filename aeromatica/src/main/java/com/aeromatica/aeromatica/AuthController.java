package com.aeromatica.aeromatica;

import com.aeromatica.aeromatica.dto.RegisterRequest;
import com.aeromatica.aeromatica.dto.RegisterResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@RequestMapping("/register")
public class AuthController {
    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public String registerForm() {
        return "register.html";
    }

    @PostMapping
    @ResponseBody
        public ResponseEntity<RegisterResponse> registerAccount(@Valid @RequestBody RegisterRequest request) {
            RegisterResponse response = userService.registerUser(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

}
