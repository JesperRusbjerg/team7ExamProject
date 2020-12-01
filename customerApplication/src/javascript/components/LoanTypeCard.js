import { Card, Divider } from 'antd';

const LoanTypeCard = ({ title, link, description, options }) => (
  <Card title={title} extra={<a href={link}>Explore Loans</a>} style={{ minHeight: 450 }}>
    <p>{description}</p>
    <Divider plain />
    <ul>
      {options.map(option => <li>{option}</li>)}
    </ul>
  </Card>
);

export default LoanTypeCard;