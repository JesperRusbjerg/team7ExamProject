package DTOs;

public class ResultDTO {

    private final String CPR;
    private final int score;

    public ResultDTO(String CPR, int score) {
        this.CPR = CPR;
        this.score = score;
    }

    @Override
    public String toString() {
        return "ResultDTO{" + "CPR=" + CPR + ", score=" + score + '}';
    }
}
