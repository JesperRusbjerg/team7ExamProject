import { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Button, Select, Steps, Table } from 'antd';
import { FormOutlined, SolutionOutlined, SearchOutlined, ProfileOutlined, MailOutlined, LoadingOutlined } from '@ant-design/icons';
import LabelWithInfo from '../components/LabelWithInfo.js';
import PageHeader from '../components/PageHeader.js';
import AlertBanner from '../components/AlertBanner.js';
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
      description: 'Explore the different banks offers',
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
  const [validationResult, setValidationResult] = useState();
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    let temp = [...steps];
    changeActiveStep(activeStep, temp);
    setSteps(temp);
  }, [activeStep, setActiveStep]);

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

  const submitInformation = (data) => {
    setInformation(data);
    setActiveStep(2);
    validateInformation(data);
  };

  const validateInformation = (data) => {
    const result = facade.validateInput(data);
    setTimeout(() => {
      if (result.validation) {
        setActiveStep(3);
        setTimeout(() => {
          const loansData = facade.searchForLoans(data);
          setActiveStep(4);
          setTimeout(() => {
            setLoans(loansData);
            setActiveStep(5);
            setTimeout(() => {
              facade.sendMail(data, loansData);
              setActiveStep(6);
            }, 2000);
          }, 2000);
        }, 5000);
      } else {
        setActiveStep(1);
        setValidationResult(result);
      }
    }, 2000);
  };

  const resetValidationResult = () => {
    setValidationResult(undefined);
  };

  const renderContent = () => {
    if (loans.length > 0) {
      const columns = [
        {
          title: 'Bank',
          dataIndex: 'bankName',
          key: 'bankName',
        },
        {
          title: 'Initial payment',
          dataIndex: 'initialPayment',
          key: 'initialPayment',
        },
        {
          title: 'Interest',
          dataIndex: 'interest',
          key: 'interest',
        },
        {
          title: 'Action',
          key: 'action',
          render: () => (
            <a>Redirect</a>
          ),
        },
      ];
      return (
        <Table dataSource={loans} columns={columns} />
      );
    } else {
      return (
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
      );
    }
  }

  return (
    <div className='site-layout' style={{ padding: 24, minHeight: 600 }}>
      <PageHeader title="Search all banks in matter of seconds and find the perfect loan for you." />
      <AlertBanner validationResult={validationResult} resetValidationResult={resetValidationResult} />
      <br />
      <Row wrap={false}>
        <Col span={12}>
          {renderContent()}
        </Col>
        <Col span={5} offset={7}>
          <Steps direction='vertical'>
            {steps.map(step => <Step key={step.step} status={step.status} title={step.title} description={step.description} icon={step.active ? <LoadingOutlined /> : step.icon} />)}
          </Steps>
        </Col>
      </Row>
    </div>
  );
}

export default Search;