import React, { useState } from 'react';
import Header from '../../components/header/header';
import Hamburger from '../../components/menu/Hamburger';
import HomeSlider from '../../components/slider/slider';

import './home.css';
import UserMenu from '../../components/user/userMenu';

function Home() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen);
  }

  return (
    <>
      <Header />
      <div>
        <div className="user-menu-container">
          <UserMenu />
        </div>
        <Hamburger />

        <br></br>
        <br></br>
        <HomeSlider />
        <br></br>
        <br></br>
        <br></br>

        <div className='whatIsWrc'>
          <h1>What's WRC?</h1>
          <p>The World Rally Championship (abbreviated as WRC) is the highest level of global competition in the motor sport discipline of rallying, owned and governed by the FIA. There are separate championships for drivers, co-drivers, manufacturers and teams. The series currently consists of 13 three- to four-day rally events contested on surfaces ranging from gravel and asphalt to snow and ice. Each rally is usually divided into 15 to 25 special stages that are raced against the clock on up to 350 kilometers (220 miles) of closed roads.</p>
          <br></br>
          <br></br>
        </div>
      </div>
    </>
  );
}

export default Home;
