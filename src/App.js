import './App.css';
import WelcomePage from './screens/WelcomePage';
import { Route, Routes } from 'react-router-dom';
import { homeRoute, applicantsRoute, loginRoute, signupRoute, committeeRoute, verifyEmailRoute, profileRoute, logoutRoute, unauthorizedRoute, applicantDetailsRoute, applicantPreviewRoute } from './routes';
import SignupPage from './screens/SignupPage';
import VerifyEmailPage from './screens/VerifyEmailPage';
import LoginPage from './screens/LoginPage';
import ApplicantPage from './screens/ApplicantPage';
import Layout from './routes/Layout';
import RequireAuth from './routes/RequireAuth';
import UnauthorizedPage from './screens/UnauthorizedPage';
import { useEffect } from 'react';
import RequireVerify from './routes/RequireVerify';
import CommiteePage from './screens/CommiteePage';
import ApplicantPreviewPage from './screens/ApplicantPreviewPage';



function App() {
  useEffect(() => {
    document.title = 'Hua ELKE';
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/*Public routes*/}
        <Route index path={homeRoute} element={<WelcomePage />} />
        <Route path={applicantsRoute + signupRoute} element={<SignupPage />} />
        <Route path={loginRoute} element={<LoginPage role={applicantsRoute} />} />
        <Route path={verifyEmailRoute} element={<VerifyEmailPage />} />
        <Route path={unauthorizedRoute} element={<UnauthorizedPage />} />

        {/*Protected routes*/}
        <Route element={<RequireAuth />}>
          <Route element={<RequireVerify />}>
            <Route path={applicantsRoute + profileRoute + '/*'} element={<ApplicantPage />} />
          </Route>

        </Route>
        <Route path={committeeRoute + profileRoute} element={<CommiteePage />} />
        <Route path={committeeRoute + applicantPreviewRoute} element={<ApplicantPreviewPage />} />
      </Route>
    </Routes>
  );
}

export default App;
