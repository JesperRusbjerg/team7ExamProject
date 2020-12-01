import { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { FormOutlined, SolutionOutlined, SearchOutlined, ProfileOutlined, MailOutlined } from '@ant-design/icons';
import SearchEngine from '../components/SearchEngine.js';
import SearchStatus from '../components/SearchStatus.js';


const Search = () => {
  const init = [
    {
      active: true,
      step: 1,
      status: 'process',
      title: 'Information',
      description: 'Fill out the form and press search',
      icon: <FormOutlined />
    },
    {
      active: false,
      step: 2,
      status: 'wait',
      title: 'Verification',
      description: 'The system is verifying your information',
      icon: <SolutionOutlined />
    },
    {
      active: false,
      step: 3,
      status: 'wait',
      title: 'Searching',
      description: 'The system is search for loans of the specified type',
      icon: <SearchOutlined />
    },
    {
      active: false,
      step: 4,
      status: 'wait',
      title: 'Responses',
      description: 'Explore the different banks offers - Press the \'Send mail\' button to have the result list send to you as a mail',
      icon: <ProfileOutlined />
    },
    {
      active: false,
      step: 5,
      status: 'wait',
      title: 'Send mail',
      description: 'The system will send a mail with the reponses.',
      icon: <MailOutlined />
    },
  ];
  const [steps, setSteps] = useState(init);
  const current = steps.filter(step => step.active)[0].step
  const [information, setInformation] = useState({});

  const submitInformation = data => {
    console.log('Success:', data);
    setInformation(data);
    let temp = steps;
    changeActiveStep(2, temp);
    setSteps(temp);
    console.log('Steps:', steps);
  };

  const changeActiveStep = (newActiveStep, steps) => {
    steps.forEach(step => {
      if (step.step === newActiveStep) {
        step.active = true;
        step.status = 'process';
      } else if (step.step < newActiveStep) {
        step.active = false;
        step.status = 'finish'
      }
    });
  };

  return (
    <div className='site-layout-background' style={{ padding: 24, minHeight: 600 }}>
      <h1>Search all banks in matter of seconds and find the perfect loan for you.</h1>
      <Row wrap={false}>
        <Col span={12}>
          <SearchEngine submit={submitInformation} />
        </Col>
        <Col span={7} />
        <Col span={5}>
          <SearchStatus steps={steps} current={current} />
        </Col>
      </Row>
    </div>
  );
}

export default Search;