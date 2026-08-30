package com.aeromatica.aeromatica;

import com.aeromatica.aeromatica.dto.LoginRequest;
import com.aeromatica.aeromatica.dto.RegisterRequest;
import com.aeromatica.aeromatica.dto.RegisterResponse;
import com.aeromatica.aeromatica.exception.UserAlreadyExistsException;
import com.aeromatica.aeromatica.exception.UserNotExistsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserService {
    private final  UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public RegisterResponse registerUser(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())){
            throw new UserAlreadyExistsException("Email já cadastrado.");
        }

        User user = new User(request.name(), request.email(), passwordEncoder.encode(request.password()));
        User dbUser = userRepository.save(user);
        return new RegisterResponse(dbUser.getName(), dbUser.getEmail());
    }


}
