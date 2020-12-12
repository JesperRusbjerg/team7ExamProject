//package com.team7.esb.controller;
//
//import com.team7.esb.dto.UserDTO;
//import com.team7.esb.utils.UtilsFunctions;
//import loginModule.LoginModule;
//import org.springframework.web.bind.annotation.*;
//
//import javax.security.auth.spi.LoginModule;
//
//
//@RestController
//public class LoginController {
//
//    private static final String IP = UtilsFunctions.getStringEnvOrDefault("LOGIN-IP", "localhost");
//    private static final int PORT = UtilsFunctions.getIntEnvOrDefault("LOGIN-PORT", 3001);
//
//    @PostMapping("/login")
//    public String login(@RequestBody UserDTO login) {
//        LoginModule lm = new LoginModule(LoginController.IP, LoginController.PORT);
//        String sessionId = lm.login(login.username, login.password);
//        return sessionId;
//    }
//
//    @PostMapping("/create-user")
//    public boolean createUser(@RequestBody UserDTO user) {
//        LoginModule lm = new LoginModule(LoginController.IP, LoginController.PORT);
//        return lm.createUser(user.username, user.password);
//    }
//
//    @GetMapping("/verify")
//    public boolean verifySessionId(@RequestParam String session) {
//        LoginModule lm = new LoginModule(LoginController.IP, LoginController.PORT);
//        return lm.verifySessionId(session);
//    }
//}
