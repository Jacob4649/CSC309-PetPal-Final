import './App.css';
import { useEffect, useState } from 'react';
import ApplicationsComponent from './Components/ApplicationsComponent/ApplicationsComponent';
import UpdateUser from './Components/UpdateUser/UpdateUser';
import UpdateShelter from './Components/UpdateShelter/UpdateShelter';
import NotificationPage from './Components/Notifications/NotificationsPage';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import AuthGuard from './Components/Guards/AuthGuard';
import LoginPage from './Components/TempLogin/LoginPage';
import RouteGuard from './Components/Guards/RouteGuard';


function App() {
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    console.log(userInfo)
  }, [userInfo])
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route element={<Navbar/>}> */}
        <Route index path='/' element={
          <Navigate to={"/login"} />
        } />

        <Route index path='/login' element={
          <AuthGuard is_logged_in={userInfo !== null} setUserInfo={setUserInfo} navigate={false}>
            <LoginPage setUserInfo={setUserInfo} userInfo={userInfo} />
          </AuthGuard>
        } />
        <Route path='/update-shelter' element={
          <AuthGuard is_logged_in={userInfo !== null} setUserInfo={setUserInfo}>
            <RouteGuard is_permitted={userInfo && userInfo.is_shelter} redirect={"/login"}>
              <UpdateShelter shelter_id={userInfo && userInfo.id} />
            </RouteGuard>
          </AuthGuard>
        } />
        <Route path='/update-seeker' element={
          <AuthGuard is_logged_in={userInfo !== null} setUserInfo={setUserInfo}>
            <RouteGuard is_permitted={userInfo && !userInfo.is_shelter} redirect={"/login"}>
              <UpdateUser user_id={userInfo && userInfo.id} />
            </RouteGuard>
          </AuthGuard>
        } />
        <Route path='/notifications' element={
          <AuthGuard is_logged_in={userInfo !== null} setUserInfo={setUserInfo}>
            <NotificationPage />
          </AuthGuard>
        } />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
