import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from './pages/home/home';
import CarList from './pages/car-list/carList';
import GroupB from './pages/group-b/groupB';
import CircuitPage from './pages/calendar/circuitPage';
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
