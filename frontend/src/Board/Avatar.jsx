const Avatar = ({ fullName }) => {
    const avatarStyle = {
      display: 'inline-block',
      margin: '10px'
      
      
    };
  
    return <div style={avatarStyle}>{fullName}</div>;
  };
  

export default Avatar;