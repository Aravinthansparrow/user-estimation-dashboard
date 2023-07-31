import { lazy } from 'react';

// Project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// Dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// Utilities routing
const Estimation = Loadable(lazy(() => import('views/utilities/Estimation')));
const WorkItem = Loadable(lazy(() => import('views/utilities/WorkItemTable')));
const EstimateSummary = Loadable(lazy(() => import('views/utilities/EstimateSummary')));
const EstimationList = Loadable(lazy(() => import('views/utilities/EstimationList')));
const ComplexityLevel = Loadable(lazy(() => import('views/utilities/ComplexityLevel')));
const ComponentType = Loadable(lazy(() => import('views/utilities/ComponentType')));
const GeneralSettings = Loadable(lazy(() => import('views/utilities/GeneralSettings')));
const ActivitiesPercentageSplit = Loadable(lazy(()=> import('views/utilities/ActivitiesPercentageSplit')));

// Authenticate Routing
const ForgotPassword = Loadable(lazy(() => import('views/utilities/ChangePassword')));

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
          path: 'generate-estimation/:id',
          element: <WorkItem />
        },
        {
          path: 'generate-estimation',
          element: <Estimation />,
        },
        {
          path: 'estimation-list',
          element: <EstimationList />
        }, 
        {
          path: 'estimate-summary/:id',
          element: <EstimateSummary/>
        },
      ]
    },
    {
      path: 'master',
      children: [
        {
          path: 'component-type',
          element: <ComponentType />
        },
        {
          path: 'complexity-level',
          element: <ComplexityLevel />
        },
        {
          path: 'general-settings',
          element: <GeneralSettings />
        },
        {
          path: 'activities-split',
          element: <ActivitiesPercentageSplit />
        }
      ]
    },
    {
      path: 'auth',
      children: [
        {
          path: 'change-password',
          element: <ForgotPassword />
        }
      ]
    }
  ]
};

export default MainRoutes;
