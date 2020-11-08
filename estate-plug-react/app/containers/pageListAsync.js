import Loadable from 'react-loadable';
import Loading from 'enl-components/Loading';

// Dashboard
export const AnalyticDashboard = Loadable({
  loader: () => import('./Dashboard/AnalyticDashboard'),
  loading: Loading,
});

export const ApartTradeDashboard = Loadable({
  loader: () => import('./Dashboard/ApartTradeDashboard'),
  loading: Loading,
});

export const ApartContractDashboard = Loadable({
  loader: () => import('./Dashboard/ApartContractDashboard'),
  loading: Loading,
});

export const DetachedTradeDashboard = Loadable({
  loader: () => import('./Dashboard/DetachedTradeDashboard'),
  loading: Loading,
});

export const DetachedContractDashboard = Loadable({
  loader: () => import('./Dashboard/DetachedContractDashboard'),
  loading: Loading,
});

export const TenementTradeDashboard = Loadable({
  loader: () => import('./Dashboard/TenementTradeDashboard'),
  loading: Loading,
});

export const TenementContractDashboard = Loadable({
  loader: () => import('./Dashboard/TenementContractDashboard'),
  loading: Loading,
});

export const LandTradeDashboard = Loadable({
  loader: () => import('./Dashboard/LandTradeDashboard'),
  loading: Loading,
});

export const OfficetelTradeDashboard = Loadable({
  loader: () => import('./Dashboard/OfficetelTradeDashboard'),
  loading: Loading,
});

export const OfficetelContractDashboard = Loadable({
  loader: () => import('./Dashboard/OfficetelContractDashboard'),
  loading: Loading,
});

// Pages
export const Login = Loadable({
  loader: () => import('./Pages/Users/Login'),
  loading: Loading,
});
export const Register = Loadable({
  loader: () => import('./Pages/Users/Register'),
  loading: Loading,
});
export const ResetPassword = Loadable({
  loader: () => import('./Pages/Users/ResetPassword'),
  loading: Loading,
});

export const LockScreen = Loadable({
  loader: () => import('./Pages/Users/LockScreen'),
  loading: Loading,
});
export const ComingSoon = Loadable({
  loader: () => import('./Pages/ComingSoon'),
  loading: Loading,
});
export const Profile = Loadable({
  loader: () => import('./Pages/UserProfile'),
  loading: Loading,
});
export const Timeline = Loadable({
  loader: () => import('./Pages/Timeline'),
  loading: Loading,
});
export const BlankPage = Loadable({
  loader: () => import('./Pages/BlankPage'),
  loading: Loading,
});
export const AuthenticatedPage = Loadable({
  loader: () => import('./Pages/AuthenticatedPage'),
  loading: Loading,
});

export const Photos = Loadable({
  loader: () => import('./Pages/Photos'),
  loading: Loading,
});

// Other
export const NotFound = Loadable({
  loader: () => import('./NotFound/NotFound'),
  loading: Loading,
});
export const Error = Loadable({
  loader: () => import('./Pages/Error'),
  loading: Loading,
});
export const Maintenance = Loadable({
  loader: () => import('./Pages/Maintenance'),
  loading: Loading,
});
export const Parent = Loadable({
  loader: () => import('./Parent'),
  loading: Loading,
});
export const TermsConditions = Loadable({
  loader: () => import('./Pages/TermsConditions'),
  loading: Loading,
});
