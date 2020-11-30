import { Card, Divider, List, Typography } from 'antd';

const LoanTypeCard = ({ title, link, description, options }) => (
  <Card title={title} extra={<a href={link}>Explore Loans</a>}>
    <p>{description}</p>
    <Divider plain />
    <List
      bordered
      size="small"
      dataSource={options}
      renderItem={item => (<List.Item>{item}</List.Item>)}
    />
  </Card>
);

export default LoanTypeCard;