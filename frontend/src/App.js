import './App.css';
import { useEffect, useState } from 'react';
import MyApplicationsPage from './Pages/MyApplicationsPage';
import UpdateSeekerPage from './Pages/UpdateSeekerPage';
import UpdateShelterPage from './Pages/UpdateShelterPage';
import NotificationPage from './Pages/NotificationPage/index';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import AuthGuard from './Components/Guards/AuthGuard';
import LoginPage from './Components/TempLogin/LoginPage';
import RouteGuard from './Components/Guards/RouteGuard';
import ApplicationMessages from './Components/Messaging/ApplicationMessages';
import ExampleApplicationsPage from './Components/Messaging/ExampleApplicationsPage';


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
              <UpdateShelterPage shelter_id={userInfo && userInfo.id} />
            </RouteGuard>
          </AuthGuard>
        } />
        <Route path='/update-seeker' element={
          <AuthGuard is_logged_in={userInfo !== null} setUserInfo={setUserInfo}>
            <RouteGuard is_permitted={userInfo && !userInfo.is_shelter} redirect={"/login"}>
              <UpdateSeekerPage user_id={userInfo && userInfo.id} />
            </RouteGuard>
          </AuthGuard>
        } />
        <Route path='/notifications' element={
          <AuthGuard is_logged_in={userInfo !== null} setUserInfo={setUserInfo}>
            <NotificationPage />
          </AuthGuard>
        } />
        <Route path='/my-applications' element={
          <AuthGuard is_logged_in={userInfo !== null} setUserInfo={setUserInfo}>
            <MyApplicationsPage />
          </AuthGuard>
        } />
        <Route path='/a/:application_id' element={
          <AuthGuard is_logged_in={userInfo !== null} setUserInfo={setUserInfo}>
            <ExampleApplicationsPage userInfo={userInfo} />
          </AuthGuard>
        } />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
