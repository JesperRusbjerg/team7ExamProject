import { useState, useEffect } from 'react';
import { Steps } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const { Step } = Steps;

const SearchEngine = ({ steps, current }) => {
  const [localSteps, setLocalSteps] = useState(steps);
  useEffect(() => setLocalSteps(steps), [steps]);

  return (
    <Steps direction='vertical' current={current}>
      {localSteps.map(step => <Step status={step.status} title={step.title} description={step.description} icon={step.active ? <LoadingOutlined /> : step.icon} />)}
    </Steps>
  );
};

export default SearchEngine;