import { Alert } from 'antd';

const AboutMemberCard = ({ validationResult, resetValidationResult }) => {
  const messages = () => {
    let list = [];
    if (validationResult !== undefined) {
      if (validationResult.errorMessageCPR) {
        list.push(validationResult.errorMessageCPR);
      }
      if (validationResult.errorMessageMail) {
        list.push(validationResult.errorMessageMail);
      }
      if (validationResult.errorMessageAmount) {
        list.push(validationResult.errorMessageAmount);
      }
    }
    return list;
  }

  if (messages().length > 0) {
    return (
      <Alert
        message='Following errors occurred while validating your information.'
        description={messages().join(' - ')}
        banner
        closable
        type='error'
        showIcon
        onClose={resetValidationResult}
      />
    );
  } else {
    return (<></>);
  }
}
export default AboutMemberCard;