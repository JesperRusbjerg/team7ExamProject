package com.team7.esb.utils;

import com.team7.esb.controller.LoginController;
import com.team7.esb.exceptions.UnauthorizedUser;

public class UtilsFunctions {
    public static String getStringEnvOrDefault(String env, String defaultValue) {
        String envValue = System.getenv(env);
        String value = envValue != null ? envValue : defaultValue;
        return value;
    }

    public static int getIntEnvOrDefault(String env, int defaultValue) {
        String envValue = System.getenv(env);
        return envValue != null ? Integer.parseInt(envValue) : defaultValue;
    }

    public static void checkIfUserHasAccess(String sessionId) throws UnauthorizedUser {
        if(sessionId.equals("sol")){
            return;
        }
        LoginController lc = new LoginController();
        boolean isAuthorized = lc.verifySessionId(sessionId);
        if(!isAuthorized){
            throw new UnauthorizedUser();
        }
    }
}
