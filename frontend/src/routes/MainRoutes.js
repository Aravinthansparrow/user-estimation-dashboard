import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import EstimateSummary from 'views/utilities/EstimateSummary';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const Estimation = Loadable(lazy(() => import('views/utilities/Estimation')));
const WorkItem = Loadable(lazy(() => import('views/utilities/WorkItemTable')));
const EstimationList = Loadable(lazy(() => import('views/utilities/EstimationList')));
const ComplexityLevel = Loadable(lazy(() => import('views/utilities/ComplexityLevel')));
const ComponentType = Loadable(lazy(() => import('views/utilities/ComponentType')));
const GeneralSettings = Loadable(lazy(() => import('views/utilities/GeneralSettings')));
const ForgotPassword = Loadable(lazy(() => import('views/utilities/ChangePassword')));
const ActivitiesPercentageSplit = Loadable(lazy(()=> import('views/utilities/ActivitiesPercentageSplit')))

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
        }, 
        {
          path: 'estimate-summary/:clientId',
          element: <EstimateSummary/>
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
      path: 'master',
      children: [
        {
          path: 'activities-split',
          element: <ActivitiesPercentageSplit />
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
