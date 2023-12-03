import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from './pages/home/home';
import CarList from './pages/car-list/carList';
import GroupB from './pages/group-b/groupB';
import CircuitPage from './pages/calendar/circuitPage';
import ChangeUsername from './pages/changeUserName/changeUsername';
import ChangeProfilePic from './pages/changePfp/changeProfilePic';
import ChangePassword from './pages/change-password/changePassword';
import Login from './pages/login/login';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/list" element={<CarList/>}/>
          <Route path="/group-b" element={<GroupB/>}/>
          <Route path="/calendar" element={<CircuitPage/>}/>
          <Route path="/change-username" element={<ChangeUsername/>}/>
          <Route path="/change-profile-pic" element={<ChangeProfilePic/>}/>
          <Route path="/change-password" element={<ChangePassword/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
