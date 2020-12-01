import { Form, Input, Button, Select, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const SearchEngine = ({ submit }) => {
  const onFinish = values => {
    submit(values);
  };

  return (
    <Form
      {...layout}
      name='basic'
      initialValues={{ remember: true }}
      onFinish={onFinish}
      requiredMark={false}
    >
      <Form.Item
        label={
          <span>
            CPR&nbsp;
            <Tooltip title='We do not save or share your CPR but only use it for retrieving your credit score!'>
              <InfoCircleOutlined />
            </Tooltip>
          </span>
        }
        name='cpr'
        rules={[{ required: true, message: 'Please input your CPR!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={
          <span>
            Mail&nbsp;
            <Tooltip title='We do not save or share your mail but only use it for sending your responses to you!'>
              <InfoCircleOutlined />
            </Tooltip>
          </span>
        }
        name='mail'
        rules={[{ required: true, message: 'Please input your mail!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Loan type" name="loanType" rules={[{ required: true, message: 'Please choose a loan type!' }]}>
        <Select placeholder="Select your loan type" allowClear >
          <Option value="quick">Quick</Option>
          <Option value="mortgage">Mortgage</Option>
          <Option value="student">Student</Option>
        </Select>
      </Form.Item>

      <Form.Item label='Loan amount' name='amount' rules={[{ required: true, message: 'Please input the desired amount to loan!' }]} >
        <Input />
      </Form.Item>

      <Form.Item label="Valuta" name="valuta" rules={[{ required: true, message: 'Please choose a valuta!' }]}>
        <Select placeholder="Select your preferred valuta" allowClear >
          <Option value="DKK">DKK</Option>
          <Option value="USD">USD</Option>
        </Select>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default SearchEngine;