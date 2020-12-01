import React from 'react';
import './App.css';
import { Layout, Menu } from 'antd';
import Home from './javascript/pages/Home.js';
import Search from './javascript/pages/Search.js';

const { Header, Content } = Layout;

const App = () => (
  <div className='App'>
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['1']}>
          <Menu.Item key='1'>Home</Menu.Item>
          <Menu.Item key='2'>Search</Menu.Item>
          <Menu.Item key='3'>About</Menu.Item>
        </Menu>
      </Header>
      <Content className='site-layout' style={{ padding: '25px 50px 0px 50px', marginTop: 64 }}>
        <Search />
      </Content>
    </Layout>
  </div>
);

export default App;