import { Card, Divider } from 'antd';
import { NavLink } from "react-router-dom";

const LoanTypeCard = ({ title, description, options, setSelectedTab }) => (
  <Card
    className='card-layout-background loan-card'
    title={<h3>{title}</h3>}
    extra={<NavLink exact activeClassName="active" to="/search" onClick={() => { setSelectedTab('2') }}>Explore Loan</NavLink>}
  >
    <i>{description}</i>
    <Divider plain />
    <ul>
      {options.map(option => <li>{option}</li>)}
    </ul>
  </Card>
);

export default LoanTypeCard;