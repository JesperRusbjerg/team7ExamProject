package utils;

import DTOs.PersonDTO;
import DTOs.SearchDTO;
import enums.Gender;

public class CreditCalculator {

    public static int calculateCreditScore(PersonDTO person) {
        // Start value at 100
        int creditScore = 100;
        
        // Alter by gender (5)
        boolean isFemale = person.getGender() == Gender.FEMALE;
        creditScore -= isFemale ? 0 : 5;
        
        // Alter by age (5)
        boolean primeAge = person.getAge() >= 27 && person.getAge() <= 50;
        creditScore -= primeAge ? 0 : 5;
        
        // Alter by income (30)
        if (person.getSalary() < 30000) {
            int saleryDiff = 30000 - person.getSalary();
            int roundedThousands = Math.round(saleryDiff / 1000);
            creditScore -= roundedThousands;
        }
        
        // Alter by education level (30)
        switch (person.getEducationLevel()) {
            case LEVEL4:
                creditScore -= 30;
                break;
            case LEVEL5:
                creditScore -= 18;
                break;
            case LEVEL6:
                creditScore -= 12;
                break;
            case LEVEL7:
                creditScore -= 4;
                break;
            case LEVEL8:
                creditScore -= 0;
                break;
            default:
                creditScore -= 30;
                break;
        }
        
        // Alter by prior searches (30)
        int maxSearches = 6;
        if (person.getPriorSearches().size() >= maxSearches) {
            creditScore -= 30;
        } else {
            for (SearchDTO search : person.getPriorSearches()) {
                creditScore -= 5;
            }
        }
        
        // Return
        return creditScore;
    }

}
