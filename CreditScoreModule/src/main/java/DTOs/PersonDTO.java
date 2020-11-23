package DTOs;

import enums.EducationLevel;
import enums.Gender;
import java.util.List;

public class PersonDTO {

    private final String CPR;
    private final String name;
    private final int age;
    private final Gender gender;
    private final EducationLevel educationLevel;
    private final int salary;
    private final List<SearchDTO> priorSearches;

    public PersonDTO(String CPR, String name, int age, Gender gender, EducationLevel educationLevel, int salary, List<SearchDTO> priorSearches) {
        this.CPR = CPR;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.educationLevel = educationLevel;
        this.salary = salary;
        this.priorSearches = priorSearches;
    }

    public int getAge() {
        return age;
    }

    public Gender getGender() {
        return gender;
    }

    public EducationLevel getEducationLevel() {
        return educationLevel;
    }

    public int getSalary() {
        return salary;
    }

    public List<SearchDTO> getPriorSearches() {
        return priorSearches;
    }
    

    @Override
    public String toString() {
        return "PersonDTO{" + "CPR=" + CPR + ", name=" + name + ", age=" + age + ", gender=" + gender + ", educationLevel=" + educationLevel + ", salary=" + salary + ", priorSearches=" + priorSearches + '}';
    }

}
