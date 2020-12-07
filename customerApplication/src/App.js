import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Route, Switch, NavLink } from "react-router-dom";
import './App.css';
import NoMatch from './javascript/pages/NoMatch.js';
import Home from './javascript/pages/Home.js';
import Search from './javascript/pages/Search.js';
import About from './javascript/pages/About.js';

const { Header, Content } = Layout;

const App = () => {
  const selectedTabInit = '1';
  const [selectedTab, setSelectedTab] = useState(selectedTabInit);

  return (
    <div className='App'>
      <Layout>
        <Header style={{ background: 'white', position: 'fixed', zIndex: 1, width: '100%', height: '65.4px' }}>
          <Menu mode='horizontal' defaultSelectedKeys={[selectedTabInit]} selectedKeys={[selectedTab]}>
            <Menu.Item key='1' onClick={() => { setSelectedTab('1') }}><NavLink exact activeClassName="active" to="/">Home</NavLink></Menu.Item>
            <Menu.Item key='2' onClick={() => { setSelectedTab('2') }}><NavLink exact activeClassName="active" to="/search">Search</NavLink></Menu.Item>
            <Menu.Item key='3' onClick={() => { setSelectedTab('3') }}><NavLink exact activeClassName="active" to="/about">About</NavLink></Menu.Item>
            <Menu.Item key='4' onClick={() => { setSelectedTab('1') }} style={{ float: 'right' }}><a href="https://www.google.com/" target="_blank" rel="noreferrer">Adminstration</a></Menu.Item>
          </Menu>
        </Header>
        <Content className='site-layout-background' style={{ padding: '38.8px 50px 0px 50px', marginTop: 64 }}>
          <Switch>
            <Route exact path="/">
              <Home setSelectedTab={setSelectedTab} />
            </Route>
            <Route exact path="/search">
              <Search />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route>
              <NoMatch />
            </Route>
          </Switch>
        </Content>
      </Layout>
    </div>
  );
};

export default App;