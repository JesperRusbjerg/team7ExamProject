import { Row, Col } from 'antd';
import LoanTypeCarousel from '../components/LoanTypeCarousel.js';


const Home = () => (
  <div className='site-layout-background' style={{ padding: 24, minHeight: 600 }}>
    <h1>In the need for a loan? Go no further</h1>
    <Row wrap={false}>
      <Col span={6} />
      <Col span={12}>
        <LoanTypeCarousel />
      </Col>
      <Col span={6} />
    </Row>
  </div>
);

export default Home;