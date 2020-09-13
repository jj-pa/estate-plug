import Loadable from 'react-loadable';
import Loading from 'enl-components/Loading';

// Dashboard
export const AnalyticDashboard = Loadable({
  loader: () => import('./Dashboard/AnalyticDashboard'),
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
