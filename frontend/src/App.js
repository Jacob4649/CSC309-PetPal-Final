import './App.css';
import { useEffect, useState } from 'react';
import MyApplicationsPage from './Pages/MyApplicationsPage';
import UpdateSeekerPage from './Pages/UpdateSeekerPage';
import UpdateShelterPage from './Pages/UpdateShelterPage';
import NotificationPage from './Pages/NotificationPage/index';
import PetDetailPage from './Pages/PetDetailPage/index';
import PetAdoptionPage from './Pages/PetAdoptionPage/index';
import PetApplicationPage from './Pages/PetApplicationPage';
import { BrowserRouter, Routes, Route, Navigate, Outlet, useNavigate } from "react-router-dom"
import AuthGuard from './Components/Guards/AuthGuard';
import LoginPage from './Components/TempLogin/LoginPage';
import RouteGuard from './Components/Guards/RouteGuard';
import LoginUser from "./Pages/LoginUser/LoginUser";
import LoginShelter from "./Pages/LoginShelter/LoginShelter";
import SignupShelter from "./Pages/SignupShelter/SignupShelter";
import SignupUser from "./Pages/SignupUser/SignupUser";
import ListingCreate from "./Pages/ListingCreate/ListingCreate";
import ApplicationMessages from './Components/Messaging/ApplicationMessages';
import ExampleApplicationsPage from './Components/Messaging/ExampleApplicationsPage';
import ShelterDetailPage from './Pages/ShelterDetailPage/ShelterDetailPage';
import GenericErrorPage from './Pages/ErrorPages/GenericErrorPage';
import LoadingPage from './Pages/LoadingPage/LoadingPage';
import Footer from './Components/NavFooterLayout/Footer';
import ListingUpdate from "./Pages/ListingUpdate/ListingUpdate";
import ShelterBlogsPage from './Pages/ShelterBlogsPage';
import CreateShelterBlogPage from './Pages/CreateShelterBlogPage';
import "./theme.css"
import ShelterBlogPage from './Pages/ShelterBlogPage/ShelterBlogPage';
import LandingPage from "./Pages/LandingPage/LandingPage";
import { NavBar } from './Components/NavFooterLayout/Navbar';
import { HomePage } from './Pages/HomePage/HomePage';
import { Button } from '@mui/material';
import { ArrowBack, Home } from '@mui/icons-material';
import HomeButton from './Components/Buttons/HomeButton';


function App() {
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    console.log(userInfo)
  }, [userInfo])
  return (
    <BrowserRouter>
      <Routes>
        <Route element={
          <>
            <NavBar setUserInfo={setUserInfo} userInfo={userInfo} />
            <Outlet />
            <Footer />
          </>
        }>
          {/* <Route element={<Navbar/>}> */}
          <Route path='/landing-page' element={
            <LandingPage setUserInfo={setUserInfo} userInfo={userInfo} />
          } />
          <Route path='/login-seeker' element={
            <AuthGuard is_logged_in={userInfo !== null} setUserInfo={setUserInfo} navigate={false}>
              <LoginUser setUserInfo={setUserInfo} userInfo={userInfo} />
            </AuthGuard>
          } />
          <Route path='/login-shelter' element={
            <AuthGuard is_logged_in={userInfo !== null} setUserInfo={setUserInfo} navigate={false}>
              <LoginShelter setUserInfo={setUserInfo} userInfo={userInfo} />
            </AuthGuard>
          } />
          <Route path='/signup-seeker' element={
            <AuthGuard is_logged_in={userInfo !== null} setUserInfo={setUserInfo} navigate={false}>
              <SignupUser setUserInfo={setUserInfo} userInfo={userInfo} />
            </AuthGuard>
          } />
          <Route path='/signup-shelter' element={
            <AuthGuard is_logged_in={userInfo !== null} setUserInfo={setUserInfo} navigate={false}>
              <SignupShelter setUserInfo={setUserInfo} userInfo={userInfo} />
            </AuthGuard>
          } />
        </Route>
        <Route element={
          <>
            <NavBar userInfo={userInfo} setUserInfo={setUserInfo}/>
            <Outlet />
            <Footer />
          </>}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path='/update-shelter' element={
            <AuthGuard is_logged_in={userInfo !== null} setUserInfo={setUserInfo}>
              <RouteGuard is_permitted={userInfo && userInfo.is_shelter} redirect={"/login-shelter"}>
                <UpdateShelterPage shelter_id={userInfo && userInfo.id} />
              </RouteGuard>
            </AuthGuard>
          } />
          <Route path='/update-seeker' element={
            <AuthGuard is_logged_in={userInfo !== null} setUserInfo={setUserInfo}>
              <RouteGuard is_permitted={userInfo && !userInfo.is_shelter} redirect={"/login-seeker"}>
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
              <MyApplicationsPage userInfo={userInfo && userInfo} />
            </AuthGuard>
          } />
          <Route path='/a/:application_id' element={
            <AuthGuard is_logged_in={userInfo !== null} setUserInfo={setUserInfo}>
              <ExampleApplicationsPage userInfo={userInfo} />
            </AuthGuard>
          } />
          <Route path='/shelter/:shelter_id' element={
            <AuthGuard is_logged_in={userInfo !== null} setUserInfo={setUserInfo}>
              <ShelterDetailPage userInfo={userInfo} />
            </AuthGuard>
          } />
          <Route path='/create-listing' element={
            <AuthGuard is_logged_in={userInfo !== null} setUserInfo={setUserInfo}>
              <ListingCreate userInfo={userInfo} />
            </AuthGuard>
          } />
          <Route path='/update-listing/:listing_id' element={
            <AuthGuard is_logged_in={userInfo !== null} setUserInfo={setUserInfo}>
              <ListingUpdate userInfo={userInfo} />
            </AuthGuard>
          } />
          <Route path='/pet-detail/:petId' element={
            <AuthGuard is_logged_in={userInfo !== null} setUserInfo={setUserInfo}>
              <PetDetailPage userInfo={userInfo} />
            </AuthGuard>
          } />
          <Route path='/pet-adoption/:petId' element={
            <AuthGuard is_logged_in={userInfo !== null} setUserInfo={setUserInfo}>
              <PetAdoptionPage userInfo={userInfo} />
            </AuthGuard>
          } />
          <Route path='/pet-application/:applicationId' element={
            <AuthGuard is_logged_in={userInfo !== null} setUserInfo={setUserInfo}>
              <PetApplicationPage userInfo={userInfo} />
            </AuthGuard>
          } />
          <Route path='/shelter-blogs' element={
            <AuthGuard is_logged_in={userInfo !== null} setUserInfo={setUserInfo}>
              <ShelterBlogsPage userInfo={userInfo} />
            </AuthGuard>
          } />
          <Route path='/shelter-blogs/:shelter_blog_id' element={
            <AuthGuard is_logged_in={userInfo !== null} setUserInfo={setUserInfo}>
              <ShelterBlogPage userInfo={userInfo} />
            </AuthGuard>
          } />
          <Route path='/shelter-blogs/create' element={
            <AuthGuard is_logged_in={userInfo !== null} setUserInfo={setUserInfo}>
              <RouteGuard is_permitted={userInfo && userInfo.is_shelter} redirect={"/"}>
                <CreateShelterBlogPage userInfo={userInfo} />
              </RouteGuard>
            </AuthGuard>
          } />
          <Route path='/home' element={
            <AuthGuard is_logged_in={userInfo !== null} setUserInfo={setUserInfo}>
              <HomePage userInfo={userInfo} />
            </AuthGuard>
          }/>
          <Route path='/404' element={
            <GenericErrorPage header={"404 - Page Not Found"} content={<HomeButton />} />
          } />
          <Route path='*' element={
            <GenericErrorPage header={"404 - Page Not Found"} />
          } />
        </Route>
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;