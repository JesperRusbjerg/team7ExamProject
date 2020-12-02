import { Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const LabelWithInfo = ({ title, description }) => (
  <span>
    {title}&nbsp;
    <Tooltip title={description}>
      <InfoCircleOutlined />
    </Tooltip>
  </span>
);

export default LabelWithInfo;