package com.aeromatica.aeromatica.service;

import com.aeromatica.aeromatica.User;
import com.aeromatica.aeromatica.UserRepository;
import com.aeromatica.aeromatica.dto.LoginRequest;
import com.aeromatica.aeromatica.dto.LoginResponse;
import com.aeromatica.aeromatica.exception.UserNotExistsException;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final HttpSession httpSession;

    public  AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, HttpSession httpSession) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.httpSession = httpSession;
    }

    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new UserNotExistsException("Usuário não encontrado."));
        if (!passwordEncoder.matches(request.password(), user.getHash())) {
            throw new RuntimeException("Senha incorreta.");
        }
        httpSession.setAttribute("user", user);
        return new LoginResponse(user.getName());
    }
}
