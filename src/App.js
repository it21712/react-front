import './App.css';
import WelcomePage from './screens/WelcomePage';
import { Route, Routes } from 'react-router-dom';
import { homeRoute, applicantsRoute, loginRoute, signupRoute, committeeRoute, verifyEmailRoute, profileRoute } from './routes';
import SignupPage from './screens/SignupPage';
import VerifyEmailPage from './screens/VerifyEmailPage';
import LoginPage from './screens/LoginPage';
import ApplicantPage from './screens/ApplicantPage';
function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path={homeRoute} element={<WelcomePage />} />
        <Route path={loginRoute} element={<LoginPage />} />
        <Route path={applicantsRoute + signupRoute} element={<SignupPage />} />
        <Route path={committeeRoute + signupRoute} element={<SignupPage />} />
        <Route path={verifyEmailRoute} element={<VerifyEmailPage />} />
        <Route path={applicantsRoute + profileRoute} element={<ApplicantPage />} />
      </Routes>
    </div>


  );
}

export default App;
