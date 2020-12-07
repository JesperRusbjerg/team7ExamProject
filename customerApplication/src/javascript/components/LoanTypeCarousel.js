import { Carousel } from 'antd';
import LoanTypeCard from './LoanTypeCard.js'

const titleQuick = 'Quick Loan';
const descriptionQuick = 'Individuals who are experiencing cash flow issues can access quick loans irrespective of their financial status or credit rating. Many lenders and financial institutions have started offering these services to their clients. These loans are short-term, but they can help you in avoiding embarrassing situations and paying off your bills.';
const optionsQuick = ['Application Process Is Easy', 'Fast Approval and Security of Information', 'Flexibility', 'No Debt Involved', 'Convenient', 'Boost Your Credit Rating']

const titleMortgage = 'Mortgage Loan';
const descriptionMortgage = 'There are certain times in life when we need funds urgently. The greatest advantage of a mortgage loan is that you do not have to bequeath your ownership of the property and can get the loan at very low interest rates as opposed to most other loans.';
const optionsMortgage = ['Fixed interest rate or floating interest rate', 'You continue to remain the legal owner of your property while you use the funds from the loan to fulfil your needs', 'Mortgage loans are easily approved since they are secured loans', 'The interest you pay on a mortgage loan is much lower than that of a personal loan', 'You get flexible repayment tenures', 'There is no restriction on how you use the money']

const titleStudent = 'Student Loan';
const descriptionStudent = 'Most college students these days take out student loans to pay for the cost of higher education. In fact, 68 percent of college seniors who graduated from a public or nonprofit college in 2015 had student loans, according to a study by the Institute for College Access and Success.';
const optionsStudent = ['No Credit History Needed', 'Fixed Interest Rates', 'Lower Interest Rates Than Private Loans', 'Can Postpone Payments', 'Income-Driven Payment Options', 'Takes Longer to Default']

function onChange(a, b, c) {
  console.log(a, b, c);
}

const LoanTypeCarousel = ({ setSelectedTab }) => (
  <Carousel autoplay afterChange={onChange} style={{ minHeight: 500 }}>
    <div>
      <LoanTypeCard title={titleQuick} description={descriptionQuick} options={optionsQuick} setSelectedTab={setSelectedTab} />
    </div>
    <div>
      <LoanTypeCard title={titleMortgage} description={descriptionMortgage} options={optionsMortgage} setSelectedTab={setSelectedTab} />
    </div>
    <div>
      <LoanTypeCard title={titleStudent} description={descriptionStudent} options={optionsStudent} setSelectedTab={setSelectedTab} />
    </div>
  </Carousel>
);

export default LoanTypeCarousel;