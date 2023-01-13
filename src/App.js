import './App.css';
import WelcomePage from './screens/WelcomePage';
import { Route, Routes } from 'react-router-dom';
import { homeRoute, applicantsRoute, loginRoute, signupRoute, committeeRoute, verifyEmailRoute, profileRoute, logoutRoute, unauthorizedRoute, applicantDetailsRoute } from './routes';
import SignupPage from './screens/SignupPage';
import VerifyEmailPage from './screens/VerifyEmailPage';
import LoginPage from './screens/LoginPage';
import ApplicantPage from './screens/ApplicantPage';
import Layout from './routes/Layout';
import RequireAuth from './routes/RequireAuth';
import UnauthorizedPage from './screens/UnauthorizedPage';
import { TabProvider } from './context/TabProvider';
import UserDetailsFragment from './components/UserDetailsFragment';


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
          <Route path={applicantsRoute + profileRoute + '/*'} element={<ApplicantPage />} />
          {/* <Route path={applicantsRoute + profileRoute}>
            <Route path={applicantsRoute + profileRoute + applicantDetailsRoute} element={<UserDetailsFragment />}></Route>
          </Route> */}

        </Route>

      </Route>
    </Routes>
  );
}

export default App;
