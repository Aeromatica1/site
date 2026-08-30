package com.aeromatica.aeromatica;

import com.aeromatica.aeromatica.dto.LoginRequest;
import com.aeromatica.aeromatica.exception.UserNotExistsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public  AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public boolean verifyPassword(LoginRequest request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new UserNotExistsException("Usuário não encontrado."));
        return passwordEncoder.matches(request.password(), user.getHash());
    }
}
