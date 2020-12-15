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



}