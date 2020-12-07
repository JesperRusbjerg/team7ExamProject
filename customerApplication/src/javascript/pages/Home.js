import { Row, Col, Image } from 'antd';
import LoanTypeCarousel from '../components/LoanTypeCarousel.js';
import PageHeader from '../components/PageHeader.js';
import logoBanner from '../../images/logo-banner.png';


const Home = ({ setSelectedTab }) => (
  <div className='site-layout' style={{ padding: 24, minHeight: 600 }}>
    <PageHeader title="We here at Bankster will help you compare loans and save money" />
    <Row wrap={false}>
      <Col span={11}>
        <p>At Bankster we service you with comparison of different loan types and prices.</p>
        <p>We would like to offer everyone transparency and the advantages of seeing all possibly loan providers and compare.</p>
        <p>To search for you specific loan wish just fill out the form in the search tab. We use your personal information to find your personal credit score, which the banks requires to give you a personalized loan offer.</p>
        <p>For more information about loans and pros and cons to what is right for you check the quick overview box.</p>
        <Image src={logoBanner} />
      </Col>
      <Col span={1} />
      <Col span={12} className='card-layout'>
        <LoanTypeCarousel setSelectedTab={setSelectedTab} />
      </Col>
    </Row>
  </div>
);

export default Home;