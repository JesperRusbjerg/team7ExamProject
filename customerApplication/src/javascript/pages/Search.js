import { useState, useEffect } from 'react';
import { Row, Col, Divider, Form, Input, Button, Select, Steps } from 'antd';
import { FormOutlined, SolutionOutlined, SearchOutlined, ProfileOutlined, MailOutlined, LoadingOutlined } from '@ant-design/icons';
import LabelWithInfo from '../components/LabelWithInfo.js';
import facade from '../scripts/facade';

const { Option } = Select;
const { Step } = Steps;

const Search = () => {
  const initSteps = [
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
  const initInformation = {};
  const [steps, setSteps] = useState(initSteps);
  const [information, setInformation] = useState(initInformation);
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    updateSteps();
  }, [activeStep]);

  const updateSteps = () => {
    let temp = steps;
    changeActiveStep(activeStep, temp);
    setSteps(temp);
  };

  const changeActiveStep = (newActiveStep, steps) => {
    steps.forEach(step => {
      if (step.step === newActiveStep) {
        step.active = true;
        step.status = 'process';
      } else if (step.step < newActiveStep) {
        step.active = false;
        step.status = 'finish';
      } else {
        step.active = false;
        step.status = 'wait';
      }
    });
  };

  const submitInformation = data => {
    console.log('data: ', data);
    setInformation(data);
    setActiveStep(2);
    validateInformation(data);
  };

  const validateInformation = (data) => {
    const result = facade.validateInput(data);
    console.log('result: ', result);
    console.log('data: ', data);
    if (result.validation) { // missing to update
      setActiveStep(3);
      alert('Validation succeded', result, data);
    } else {
      setActiveStep(1);
      alert('Validation failed', result, data);
    }
  };

  return (
    <div className='site-layout-background' style={{ padding: 24, minHeight: 600 }}>
      <h1>Search all banks in matter of seconds and find the perfect loan for you.</h1>
      <Divider />
      <Row wrap={false}>
        <Col span={12}>
          <Form labelCol={{ span: 4 }} wrapperCol={{ span: 12 }} name='basic' initialValues={{ remember: true }} onFinish={submitInformation} requiredMark={false} >
            <Form.Item label={<LabelWithInfo title='CPR' description='We do not save or share your CPR but only use it for retrieving your credit score!' />} name='cpr' rules={[{ required: true, message: 'Please input your CPR!' }]} >
              <Input disabled={!steps[0].active} />
            </Form.Item>

            <Form.Item label={<LabelWithInfo title='Mail' description='We do not save or share your mail but only use it for sending your responses to you!' />} name='mail' rules={[{ required: true, message: 'Please input your mail!' }]} >
              <Input disabled={!steps[0].active} />
            </Form.Item>

            <Form.Item label="Loan type" name="loanType" rules={[{ required: true, message: 'Please choose a loan type!' }]}>
              <Select placeholder="Select your loan type" allowClear disabled={!steps[0].active}>
                <Option value="quick">Quick</Option>
                <Option value="mortgage">Mortgage</Option>
                <Option value="student">Student</Option>
              </Select>
            </Form.Item>

            <Form.Item label='Loan amount' name='amount' rules={[{ required: true, message: 'Please input the desired amount to loan!' }]} >
              <Input disabled={!steps[0].active} />
            </Form.Item>

            <Form.Item label="Valuta" name="valuta" rules={[{ required: true, message: 'Please choose a valuta!' }]}>
              <Select placeholder="Select your preferred valuta" allowClear disabled={!steps[0].active}>
                <Option value="DKK">DKK</Option>
                <Option value="USD">USD</Option>
              </Select>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 4, span: 12 }}>
              <Button type='primary' htmlType='submit' disabled={!steps[0].active}>
                Submit
              </Button>
            </Form.Item>
          </Form >
        </Col>
        <Col span={5} offset={7}>
          <Steps direction='vertical' current={steps.filter(step => step.active)[0].step}>
            {steps.map(step => <Step key={step.step} status={step.status} title={step.title} description={step.description} icon={step.active ? <LoadingOutlined /> : step.icon} />)}
          </Steps>
        </Col>
      </Row>
    </div>
  );
}

export default Search;