import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import './circuitPage.css';
import Header from "../../components/header/header";
import Hamburger from '../../components/menu/Hamburger';
import UserMenu from '../../components/user/userMenu';

type Circuit = {
  name: string;
  date: string;
  time: string;
};

const localizer = momentLocalizer(moment);

const CircuitPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedCircuit, setSelectedCircuit] = useState<Circuit | null>(null);
  const [circuitEvents, setCircuitEvents] = useState<any[]>([]);

  const handleDateChange = (value: Date) => {
    setSelectedDate(value);
  };

  const handleCircuitDateChange = (circuit: Circuit) => {
    setSelectedCircuit(circuit);
    setSelectedDate(new Date(circuit.date + ' ' + circuit.time));
  };

  const circuits: Circuit[] = [
    { name: 'GREECE', date: '2023-11-10', time: '09:00' },
    { name: 'SPAIN', date: '2023-12-05', time: '14:30' },
    { name: 'MONTECARLO', date: '2024-01-07', time: '11:30' },
  ];

  const sortedCircuits = circuits.sort((a, b) => new Date(a.date + ' ' + a.time).getTime() - new Date(b.date + ' ' + b.time).getTime());

  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen);
  }

  useEffect(() => {
    const circuitEventsData = sortedCircuits.map((circuit, index) => ({
      id: index + 1,
      title: circuit.name,
      start: new Date(circuit.date + ' ' + circuit.time),
      end: new Date(circuit.date + ' ' + circuit.time),
      isEarliest: index === 0,
    }));
    setCircuitEvents(circuitEventsData);
  }, []);

  return (
    <>
      <Header />
      <div className="user-menu-container">
        <UserMenu />
      </div>
      <Hamburger/>
      <div className="container">
        <h1>Circuits</h1>
        <p>
          Below you have all the necessary information about when and where the next rallies of this year's championship will be held.
        </p>
        <div className="circuits-list">
          <ul>
            {sortedCircuits.map((circuit, index) => (
              <li key={index}>
                <div onClick={() => handleCircuitDateChange(circuit)} className="circuit-link">
                  {circuit.name} - {circuit.date} at {circuit.time}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="calendar-container">
          <h2>Calendar</h2>
          <Calendar
            localizer={localizer}
            popup
            selectable
            events={circuitEvents}
            defaultView="month"
            defaultDate={selectedDate}
            onSelectEvent={(event) => handleDateChange(event.start as Date)}
            eventPropGetter={(event) => ({
              style: {
                backgroundColor: event.isEarliest ? 'red' : 'blue',
              },
            })}
          />
        </div>
      </div>
    </>
  );
};

export default CircuitPage;
