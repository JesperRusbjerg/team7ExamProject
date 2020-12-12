package com.team7.esb.controller;

import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

public class SaveRead implements Serializable
{
    private static final String PATH = "logs.txt";

    public void saveFile(HashMap<String, List<String>> logs)
            throws ClassNotFoundException, IOException
    {
        try (ObjectOutputStream os = new ObjectOutputStream(new FileOutputStream(PATH))) {
            os.writeObject(logs);
        }
    }

    public HashMap<String, List<String>> readFile()
            throws ClassNotFoundException, IOException
    {
        try (ObjectInputStream is = new ObjectInputStream(new FileInputStream(PATH))) {
            return (HashMap<String, List<String>>) is.readObject();
        }
    }

    //Used for testing
    public static void main(String... args)
            throws Exception
    {


        HashMap<String, List<String>> input = new HashMap<>();

        input.put("creditScoreMicro", new ArrayList<>(Arrays.asList("1")));
        input.put("proxyMicro", new ArrayList<>(Arrays.asList("2")));
        input.put("emailMicro", new ArrayList<>(Arrays.asList("3")));
        input.put("loginMicro", new ArrayList<>(Arrays.asList("4")));
        input.put("currencyMicro", new ArrayList<>(Arrays.asList("5")));
        input.put("statisticsMicro", new ArrayList<>(Arrays.asList("6")));

        input.put("loginSuccess", new ArrayList<>(Arrays.asList("200")));

        input.get("loginSuccess").add("logged In");
        input.get("loginSuccess").add("logged In xb");
        input.get("loginSuccess").add("logged In xx");
        input.get("loginSuccess").add("logged In xbv");
        input.get("loginSuccess").add("logged In xwwww");

        input.put("loginUnSuccess", new ArrayList<>(Arrays.asList("xdxd")));

//        System.out.println(input);



        SaveRead xd = new SaveRead();

        // Populate and save our HashMap

        xd.saveFile(input);

        // Read our HashMap back into memory and print it out
        HashMap<String, List<String>> restored = xd.readFile();

        System.out.println(restored.get("loginSuccess"));
        System.out.println(restored.get("loginMicro"));

        restored.get("loginMicro").add("hejZa");

        System.out.println(restored.get("loginSuccess"));
        System.out.println(restored.get("loginMicro"));

        xd.saveFile(restored);

        HashMap<String, List<String>> restored2 = xd.readFile();

        System.out.println(restored2.get("loginSuccess"));
        System.out.println(restored2.get("loginMicro"));

    }

}