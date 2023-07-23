import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const Estimation = Loadable(lazy(() => import('views/utilities/Estimation')));
const WorkItem = Loadable(lazy(() => import('views/utilities/WorkItemTable')));
const EstimationList = Loadable(lazy(() => import('views/utilities/EstimationList')));
const ComplexityLevel = Loadable(lazy(() => import('views/utilities/ComplexityLevel')));
const ComponentType = Loadable(lazy(() => import('views/utilities/ComponentType')));
const GeneralSettings = Loadable(lazy(() => import('views/utilities/GeneralSettings')));
const ForgotPassword = Loadable(lazy(() => import('views/utilities/ForgotPassword')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'generate-estimation/:clientId',
          element: <WorkItem />
        },
        {
          path: 'generate-estimation',
          element: <Estimation />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'estimation-list',
          element: <EstimationList />
        }
      ]
    },
    {
      path: 'master',
      children: [
        {
          path: 'component-type',
          element: <ComponentType />
        }
      ]
    },
    {
      path: 'master',
      children: [
        {
          path: 'complexity-level',
          element: <ComplexityLevel />
        }
      ]
    },
    {
      path: 'master',
      children: [
        {
          path: 'general-settings',
          element: <GeneralSettings />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'forgot-password',
          element: <ForgotPassword />
        }
      ]
    },
  ]
};

export default MainRoutes;
