import './App.css';
import WelcomePage from './screens/WelcomePage';
import { Route, Routes } from 'react-router-dom';
import { homeRoute, applicantsRoute, loginRoute, signupRoute, committeeRoute, verifyEmailRoute, profileRoute, logoutRoute, unauthorizedRoute } from './routes';
import SignupPage from './screens/SignupPage';
import VerifyEmailPage from './screens/VerifyEmailPage';
import LoginPage from './screens/LoginPage';
import ApplicantPage from './screens/ApplicantPage';
import Layout from './routes/Layout';
import RequireAuth from './routes/RequireAuth';
import UnauthorizedPage from './screens/UnauthorizedPage';


function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/*Public routes*/}
        <Route path={homeRoute} element={<WelcomePage />} />
        <Route path={applicantsRoute + signupRoute} element={<SignupPage />} />
        <Route path={loginRoute} element={<LoginPage />} />
        <Route path={verifyEmailRoute} element={<VerifyEmailPage />} />
        <Route path={unauthorizedRoute} element={<UnauthorizedPage />} />

        {/*Protected routes*/}
        <Route element={<RequireAuth />}>
          <Route path={applicantsRoute + profileRoute} element={<ApplicantPage />} />

        </Route>

      </Route>
    </Routes>
  );
}

export default App;
