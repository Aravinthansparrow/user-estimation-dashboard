// material-ui
import Logoig from '../assets/images/ig-logos.png';
import { useSelector } from 'react-redux';
import logourl from '../assets/images/logo-url.png';

const Logo = () => {
  const themeMode = useSelector((state) => state.customization.themeMode);
  return (
    <div>{themeMode === 'dark' ? <img  src={logourl} alt="infognana" width={40} /> : <img src={Logoig} alt="infognana" width={175} />}</div>
  );
};

export default Logo;
