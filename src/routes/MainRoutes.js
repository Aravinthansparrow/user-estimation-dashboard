import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const Estimation = Loadable(lazy(() => import('views/utilities/Estimation')));
const WorkItemTable = Loadable(lazy(() => import('views/utilities/WorkItemTable')));
const EstimationList = Loadable(lazy(() => import('views/utilities/EstimationList')));
const ComplexityLevel = Loadable(lazy(() => import('views/utilities/ComplexityLevel')));
const ComponentType = Loadable(lazy(() => import('views/utilities/ComponentType')));


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
          path: 'generate-estimation',
          element: <Estimation />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'workitem',
          element: <WorkItemTable />
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
  ]
};

export default MainRoutes;
