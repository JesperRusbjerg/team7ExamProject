import { Carousel } from 'antd';
import LoanTypeCard from './LoanTypeCard.js'

const titleQuick = "Quick Loan";
const linkQuick = "";
const descriptionQuick = "Individuals who are experiencing cash flow issues can access quick loans irrespective of their financial status or credit rating. Many lenders and financial institutions have started offering these services to their clients. These loans are short-term, but they can help you in avoiding embarrassing situations and paying off your bills. The pikalaina is one of the best lenders of quick loans that you need to consider. The following are the benefits associated with quick loans:";
const optionsQuick = ["Application Process Is Easy", "Fast Approval and Security of Information", "Flexibility", "No Debt Involved", "Convenient", "Boost Your Credit Rating"]

const titleMortgage = "Mortgage Loan";
const linkMortgage = "";
const descriptionMortgage = "There are certain times in life when we need funds urgently. In such situations, being a homeowner proves to be a boon as you can simply mortgage your home in return for the required funds. The greatest advantage of a mortgage loan is that you do not have to bequeath your ownership of the property and can get the loan at very low interest rates as opposed to most other loans. Here’s everything you need to know about mortgage loans.";
const optionsMortgage = ["Fixed interest rate or floating interest rate", "You continue to remain the legal owner of your property while you use the funds from the loan to fulfil your needs", "Mortgage loans are easily approved since they are secured loans", "The interest you pay on a mortgage loan is much lower than that of a personal loan", "You get flexible repayment tenures", "There is no restriction on how you use the money"]

const titleStudent = "Student Loan";
const linkStudent = "";
const descriptionStudent = "Most college students these days take out student loans to pay for the cost of higher education. In fact, 68 percent of college seniors who graduated from a public or nonprofit college in 2015 had student loans, according to a study by the Institute for College Access and Success.";
const optionsStudent = ["No Credit History Needed", "You Don't Need a Co-Signer", "Fixed Interest Rates", "Lower Interest Rates Than Private Loans", "Can Postpone Payments", "Income-Driven Payment Options", "Takes Longer to Default", "Consolidation is Available With Poor Credit"]

function onChange(a, b, c) {
  console.log(a, b, c);
}

const LoanTypeCarousel = () => (
  <Carousel afterChange={onChange}>
    <div>
      <LoanTypeCard title={titleQuick} link={linkQuick} description={descriptionQuick} options={optionsQuick} />
    </div>
    <div>
      <LoanTypeCard title={titleMortgage} link={linkMortgage} description={descriptionMortgage} options={optionsMortgage} />
    </div>
    <div>
      <LoanTypeCard title={titleStudent} link={linkStudent} description={descriptionStudent} options={optionsStudent} />
    </div>
  </Carousel>
);

export default LoanTypeCarousel;