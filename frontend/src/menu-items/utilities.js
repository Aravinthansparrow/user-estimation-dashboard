// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';

import TableChartIcon from "@mui/icons-material/TableChart";
import TableViewIcon from '@mui/icons-material/TableView';
import ViewWeekIcon from "@mui/icons-material/ViewWeek";

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  TableChartIcon,
  TableViewIcon,
  ViewWeekIcon
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
      id: 'workitem-table',
      title: 'Workitem Table',
      type: 'item',
      url: '/utils/workitem',
      icon: icons.TableViewIcon,
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
        }
      ]
    }
  ]
};

export default utilities;
