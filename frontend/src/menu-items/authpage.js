// assets
import KeyIcon from '@mui/icons-material/Key';

// constant
const icons = {
  KeyIcon
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Authentication',
  type: 'group',
  children: [
    {
      id: 'change-password',
      title: 'Change Password',
      type: 'item',
      url: '/auth/change-password',
      icon: icons.KeyIcon,
      breadcrumbs: false
    }
  ]
};

export default pages;
