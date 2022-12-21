import './App.css';
import WelcomePage from './screens/WelcomePage';
import { Route, Routes } from 'react-router-dom';
import { homeRoute, applicantsRoute, loginRoute, signupRoute, committeeRoute } from './routes';
import SignupPage from './components/SignupPage';
function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path={homeRoute} element={<WelcomePage />} />
        <Route path={applicantsRoute + signupRoute} element={<SignupPage />} />
        <Route path={committeeRoute + signupRoute} element={<SignupPage />} />
      </Routes>
    </div>


  );
}

export default App;
