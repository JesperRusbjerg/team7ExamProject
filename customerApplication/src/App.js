import React from 'react';
import './App.css';
import { Layout, Menu, Row, Col } from 'antd';
import LoanTypeCarousel from './javascript/components/LoanTypeCarousel.js';


const { Header, Content } = Layout;

const App = () => (
  <div className="App">
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">Home</Menu.Item>
          <Menu.Item key="2">Search</Menu.Item>
          <Menu.Item key="3">About</Menu.Item>
        </Menu>
      </Header>
      <Content className="site-layout" style={{ padding: '25px 50px 0px 50px', marginTop: 64 }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 600 }}>
          <h1>In the need for a loan? Go no further</h1>
          <Row wrap={false}>
            <Col span={6} />
            <Col span={12}>
              <LoanTypeCarousel />
            </Col>
            <Col span={6} />
          </Row>
        </div>
      </Content>
    </Layout>
  </div>
);

export default App;