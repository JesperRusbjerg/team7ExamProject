package utils;

import DTOs.SearchDTO;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class PriorSearchesHandler {

    private static final String FILE_NAME = "searchHistory.json";
    private static final Gson GSON = new GsonBuilder().setPrettyPrinting().create();
    private static ArrayList<SearchDTO> searchHistory = new ArrayList();

    private static void writeToFile() {
        try (FileWriter file = new FileWriter(FILE_NAME)) {
            file.write(GSON.toJson(searchHistory));
            file.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static void readFromFile() {
        try (FileReader reader = new FileReader(FILE_NAME)) {
            searchHistory = GSON.fromJson(reader, new TypeToken<List<SearchDTO>>() {}.getType());
            if (searchHistory == null) {
                searchHistory = new ArrayList();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static ArrayList<SearchDTO> getSearchHistoryByCPR(String CPR) {
        checkSetup();
        ArrayList<SearchDTO> personalSearchHistory = new ArrayList();
        for (SearchDTO search : searchHistory) {
            if (search.getCPR().equals(CPR)) {
                personalSearchHistory.add(search);
            }
        }
        return personalSearchHistory;
    }

    public static void addToSearchHistory(SearchDTO search) {
        checkSetup();
        searchHistory.add(search);
        writeToFile();
    }

    private static void checkSetup() {
        if (searchHistory == null) {
            searchHistory = new ArrayList();
            readFromFile();
        }
        if (searchHistory.isEmpty()) {
            readFromFile();
        }
    }
}
