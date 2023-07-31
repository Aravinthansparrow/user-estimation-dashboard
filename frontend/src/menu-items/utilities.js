// assets
import { IconWindmill } from '@tabler/icons';
import TableChartIcon from "@mui/icons-material/TableChart";
import TableViewIcon from '@mui/icons-material/TableView';
import ViewWeekIcon from "@mui/icons-material/ViewWeek";

// constant
const icons = {
  IconWindmill,
  TableChartIcon,
  TableViewIcon,
  ViewWeekIcon,
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'generate-estimation',
      title: 'Generate Estimation',
      type: 'item',
      url: '/utils/generate-estimation',
      icon: icons.TableChartIcon,
      breadcrumbs: false
    },
    {
      id: 'estimation-list',
      title: 'Estimation List',
      type: 'item',
      url: '/utils/estimation-list',
      icon: icons.ViewWeekIcon,
      breadcrumbs: false
    },
    {
      id: 'master',
      title: 'Master',
      type: 'collapse',
      icon: icons.IconWindmill,
      children: [
        {
          id: 'component-type',
          title: 'Component Type',
          type: 'item',
          url: '/master/component-type',
          breadcrumbs: false
        },
        {
          id: 'complexity',
          title: 'Complexity Level',
          type: 'item',
          url: '/master/complexity-level',
          breadcrumbs: false
        },
        {
          id: 'general-settings',
          title: 'General Settings',
          type: 'item',
          url: '/master/general-settings',
          breadcrumbs: false
        },
        {
          id: 'activities-split',
          title: 'Activities Split Percentage',
          type: 'item',
          url: '/master/activities-split',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default utilities;
