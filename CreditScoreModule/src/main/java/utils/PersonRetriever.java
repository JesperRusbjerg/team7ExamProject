package utils;

import DTOs.PersonDTO;
import DTOs.SearchDTO;
import com.github.javafaker.Faker;
import enums.EducationLevel;
import enums.Gender;
import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.Random;

public class PersonRetriever {

    private static final Faker FAKER = new Faker();
    private static final Random RANDOM = new Random();

    public static PersonDTO retrievePerson(String CPR) {
        return mockPerson(CPR);
    }

    private static PersonDTO mockPerson(String CPR) {
        Gender gender = findGenderByCPR(CPR);
        String name = mockNameByGender(gender);
        int age = findAgeByCPR(CPR);
        EducationLevel educationLevel = mockEducationLevelByAge(age);
        int salary = mockSalaryByEducationLevel(educationLevel);
        List<SearchDTO> priorSearches = findPriorSearchesByCPR(CPR);
        return new PersonDTO(CPR, name, age, gender, educationLevel, salary, priorSearches);
    }

    private static Gender findGenderByCPR(String CPR) {
        String StringifiedCPR = String.valueOf(CPR);
        int lastIndex = StringifiedCPR.length() - 1;
        char lastChar = StringifiedCPR.charAt(lastIndex);
        int lastNumber = Integer.valueOf(lastChar);

        return lastNumber % 2 == 0 ? Gender.FEMALE : Gender.MALE;
    }

    private static String mockNameByGender(Gender gender) {
        String fullName = null;
        while (fullName == null) {
            String fullNameWithTitle = FAKER.name().fullName();
            String[] nameSplitted = fullNameWithTitle.split(" ");
            String nameTitle = nameSplitted[0];
            switch (nameTitle) {
                case "Mr.":
                    if (gender == Gender.MALE) {
                        fullName = nameSplitted[1] + " " + nameSplitted[2];
                    }
                    break;
                case "Mrs.":
                case "Ms.":
                case "Miss":
                    if (gender == Gender.FEMALE) {
                        fullName = nameSplitted[1] + " " + nameSplitted[2];
                    }
                    break;
                default:
                    break;
            }
        }
        return fullName;
    }

    private static int findAgeByCPR(String CPR) {
        String strigifiedCPR = String.valueOf(CPR);
        String strigifiedDay = strigifiedCPR.substring(0, 2);
        String strigifiedMonth = strigifiedCPR.substring(2, 4);
        String strigifiedYear = strigifiedCPR.substring(4, 6);

        int day = Integer.valueOf(strigifiedDay);
        int month = Integer.valueOf(strigifiedMonth);
        int year = Integer.valueOf(strigifiedYear);

        LocalDate now = LocalDate.now();
        String lastTwo = String.valueOf(now.getYear()).substring(2);
        if (year <= Integer.valueOf(lastTwo)) {
            year += 2000;
        } else {
            year += 1900;
        }

        LocalDate birthdate = LocalDate.of(year, month, day);
        return Period.between(birthdate, now).getYears();
    }

    private static EducationLevel mockEducationLevelByAge(int age) {
        double multiplier = RANDOM.nextFloat() + 1.0;
        if (age > (27 * multiplier)) {
            return EducationLevel.LEVEL8;
        } else if (age > (25 * multiplier)) {
            return EducationLevel.LEVEL7;
        } else if (age > (23 * multiplier)) {
            return EducationLevel.LEVEL6;
        } else if (age > (21 * multiplier)) {
            return EducationLevel.LEVEL5;
        } else if (age > 18) {
            return EducationLevel.LEVEL4;
        }
        return null;
    }

    private static int mockSalaryByEducationLevel(EducationLevel educationLevel) {
        double multiplier = RANDOM.nextFloat() + 1.0;
        multiplier = multiplier < 0.75 ? 0.75 : multiplier;
        multiplier = multiplier > 1.25 ? 1.25 : multiplier;
        multiplier = RANDOM.nextBoolean() ? multiplier : multiplier / 2;
        switch (educationLevel) {
            case LEVEL4:
                return (int) Math.round(17700 * multiplier);
            case LEVEL5:
                return (int) Math.round(28120 * multiplier);
            case LEVEL6:
                return (int) Math.round(32560 * multiplier);
            case LEVEL7:
                return (int) Math.round(37000 * multiplier);
            case LEVEL8:
                return (int) Math.round(42920 * multiplier);
            default:
                return (int) Math.round(13320 * multiplier);
        }
    }

    private static List<SearchDTO> findPriorSearchesByCPR(String CPR) {
        return PriorSearchesHandler.getSearchHistoryByCPR(CPR);
    }

}
