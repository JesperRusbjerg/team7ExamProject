package DTOs;

import java.util.Date;

public class SearchDTO {

    private final String CPR;
    private final Date searchDate;

    public SearchDTO(String CPR, Date searchDate) {
        this.CPR = CPR;
        this.searchDate = searchDate;
    }

    public SearchDTO(String CPR) {
        this.CPR = CPR;
        this.searchDate = new Date();
    }

    public String getCPR() {
        return CPR;
    }

    @Override
    public String toString() {
        return "SearchDTO{" + "CPR=" + CPR + ", searchDate=" + searchDate + '}';
    }
}
