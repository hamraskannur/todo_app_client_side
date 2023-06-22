import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import UserPublicRoute from './routes/UserPublicRoute';
import UserProtectRouter from './routes/UserProtectedRoute';
import Home from './pages/Home';

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position='top-center' />
        <Routes>
          <Route path='/' element={<UserPublicRoute><Home/></UserPublicRoute>} />
          <Route path='/editProfile' element={<UserPublicRoute><EditProfile/> </UserPublicRoute>} />
          <Route path='/profile' element={<UserPublicRoute><Profile /></UserPublicRoute>} />
          <Route path='/login' element={<UserProtectRouter><Login /></UserProtectRouter>} />
          <Route path='/register' element={<UserProtectRouter><Signup /></UserProtectRouter>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;