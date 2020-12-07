import { Image } from 'antd';

const AboutMemberCard = ({ imageSrc, name, description }) => {
  return (
    <div>
      <Image width={200} src={imageSrc} />
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  );
}
export default AboutMemberCard;