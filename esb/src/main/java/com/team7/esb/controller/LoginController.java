package com.team7.esb.controller;

import com.team7.esb.dto.UserDTO;
import com.team7.esb.exceptions.UnauthorizedUser;
import com.team7.esb.utils.UtilsFunctions;
import loginModule.LoginModule;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
public class LoginController {

    private static final String IP = UtilsFunctions.getStringEnvOrDefault("LOGIN-IP", "localhost:3001");

    private int port;
    private String ip;

    public LoginController() {
        this.ip = LoginController.IP.split(":")[0];
        this.port = Integer.parseInt(LoginController.IP.split(":")[1]);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserDTO login) {
        LoginModule lm = new LoginModule(this.ip, this.port);
        String sessionId = lm.login(login.username, login.password);
        if (sessionId == null) {
            return new ResponseEntity<>("Wrong username or password", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(sessionId, HttpStatus.OK);
    }

    @PostMapping("/create-user")
    public ResponseEntity<String> createUser(@RequestBody UserDTO user, @RequestHeader("session-id") String sessionId) {
        try {
            UtilsFunctions.checkIfUserHasAccess(sessionId);
        } catch (UnauthorizedUser unauthorizedUser) {
            return new ResponseEntity<>("Could not create user", HttpStatus.BAD_REQUEST);
        }

        LoginModule lm = new LoginModule(this.ip, this.port);
        boolean isUserCreated = lm.createUser(user.username, user.password);

        if (!isUserCreated) {
            return new ResponseEntity<>("Could not create user", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>("User created", HttpStatus.OK);
    }

    @GetMapping("/verify")
    public boolean verifySessionId(@RequestParam String session) {
        LoginModule lm = new LoginModule(this.ip, this.port);
        return lm.verifySessionId(session);
    }
}
