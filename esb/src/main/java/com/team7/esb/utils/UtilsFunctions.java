package com.team7.esb.utils;

public class UtilsFunctions {
    public static String getStringEnvOrDefault(String env, String defaultValue){
        String envValue =  System.getenv(env);
        String value =  envValue != null ? envValue : defaultValue;
        return value;
    }

    public static int getIntEnvOrDefault(String env, int defaultValue){
        String envValue =  System.getenv(env);
        return envValue != null ? Integer.parseInt(envValue) : defaultValue;
    }
}
