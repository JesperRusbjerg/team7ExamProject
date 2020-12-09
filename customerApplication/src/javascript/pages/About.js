import { Row, Col } from 'antd';
import PageHeader from '../components/PageHeader.js';
import AboutMemberCard from '../components/AboutMemberCard.js';
import JR from '../../images/JR.jpg';
import NP from '../../images/NP.jpg';
import MD from '../../images/MD.jpg';

const About = () => (
  <div className='site-layout' style={{ padding: 24, minHeight: 600 }}>
    <PageHeader title="About us, the company and the project" />
    <h2>About us</h2>
    <p>We (Jesper, Nikolai and Michael) are a part of the IT company DevOrgs and have developed this project.</p>
    <Row wrap={false}>
      <Col span={8}>
        <AboutMemberCard imageSrc={JR} name="Jesper R." description="The Elite SOAP Developer!" />
      </Col>
      <Col span={8}>
        <AboutMemberCard imageSrc={NP} name="Nikolai P." description="Our own hoptimist and happy coder!" />
      </Col>
      <Col span={8}>
        <AboutMemberCard imageSrc={MD} name="Michael D." description="The under pigeon who actually can code!" />
      </Col>
    </Row>
    <h2>About the company</h2>
    <p>A large virtual IT company DevOrgs (http://devorgs.dk) provides software and services to enterprises of various size and branches. During the recent years the company has developed expertise in digitalisation of business processes and modernization of enterprise applications by means of automation, integration and interoperability of disparate components.</p>
    <h2>About the project</h2>
    <p>This project is called 'Bankster' and is a search machine for bank loans. This project contains a customer part and a adminstrations part which uses our many microservices.</p>
  </div>
);

export default About;