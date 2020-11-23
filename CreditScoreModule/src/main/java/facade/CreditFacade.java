package facade;

import DTOs.PersonDTO;
import DTOs.ResultDTO;
import DTOs.SearchDTO;
import utils.CreditCalculator;
import utils.PersonRetriever;
import utils.PriorSearchesHandler;

public class CreditFacade {

    public static ResultDTO calculateCreditScore(String CPR) {
        PersonDTO person = PersonRetriever.retrievePerson(CPR);
        int creditScore = CreditCalculator.calculateCreditScore(person);
        PriorSearchesHandler.addToSearchHistory(new SearchDTO(CPR));
        return new ResultDTO(CPR, creditScore);
    }
}
