app.js

/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import busScheduleData from './busschedule.json';
import './App.css';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const [fromTerm, setFromTerm] = useState('');
  const [toTerm, setToTerm] = useState('');
  const [filteredSchedule, setFilteredSchedule] = useState([]);
  const [departureSuggestions, setDepartureSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);
  const [isLinkedDuty, setIsLinkedDuty] = useState(true);
  const [scheduleReports, setScheduleReports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loginStatus = localStorage.getItem('loggedIn') === 'true';
    setLoggedIn(loginStatus);
  }, []);

  useEffect(() => {
    const departures = [...new Set(busScheduleData.buses.map(bus => bus.departureLocation))];
    setDepartureSuggestions(departures);
  }, []);

  useEffect(() => {
    if (fromTerm.trim() !== '') {
      const destinations = [...new Set(busScheduleData.buses
        .filter(bus => bus.departureLocation.toLowerCase() === fromTerm.toLowerCase())
        .map(bus => bus.destination))];
      setDestinationSuggestions(destinations);
    } else {
      setDestinationSuggestions([]);
    }
  }, [fromTerm]);

  const handleSearch = () => {
    const from = fromTerm.toLowerCase();
    const to = toTerm.toLowerCase();
    const filtered = busScheduleData.buses.filter(
      (item) =>
        item.destination.toLowerCase().includes(to) &&
        item.departureLocation.toLowerCase().includes(from)
    );
    setFilteredSchedule(filtered);
    setSearchInitiated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    setLoggedIn(false);
  };

  const getGoogleMapsUrl = (from, to) => {
    return https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(from)}&destination=${encodeURIComponent(to)};
  };

  const handleEdit = (bus) => {
    navigate('/update', { state: { bus } });
  };

  // Linked and Unlinked Duty Scheduling
  const handleDutyScheduling = (bus, isLinked) => {
    setSelectedBus(bus);
    setIsLinkedDuty(isLinked);
    navigate('/duty-scheduling', { state: { bus, isLinked } });
  };

  // Schedule Analytics
  const generateReports = () => {
    const utilizationReport = calculateUtilization(busScheduleData.buses);
    const congestionReport = calculateCongestion(busScheduleData.buses);
    setScheduleReports([utilizationReport, congestionReport]);
  };

  const calculateUtilization = (buses) => {
    return buses.map(bus => ({
      busNumber: bus.id,
      utilization: Math.random() * 100, // Dummy utilization data
    }));
  };

  const calculateCongestion = (buses) => {
    return buses.map(bus => ({
      route: bus.route,
      congestionLevel: Math.random() * 100, // Dummy congestion data
    }));
  };

  return (
    <div className="app-container">
      {/* Top navigation */}
      <div className="top-navigation">
        <div className="heading-container">
          <h1 className="heading">BUS SCHEDULING & ROUTE MANAGEMENT</h1>
        </div>
        {!loggedIn ? (
          <button
            onClick={() => window.open('/login', '_blank')}
            className="login-button"
          >
            Login
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className="login-button"
          >
            Logout
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="From"
          value={fromTerm}
          onChange={(e) => setFromTerm(e.target.value)}
          className="input-field"
          list="departureSuggestions"
        />
        <datalist id="departureSuggestions">
          {departureSuggestions.map((suggestion, index) => (
            <option key={index} value={suggestion} />
          ))}
        </datalist>

        <input
          type="text"
          placeholder="To"
          value={toTerm}
          onChange={(e) => setToTerm(e.target.value)}
          className="input-field"
          list="destinationSuggestions"
        />
        <datalist id="destinationSuggestions">
          {destinationSuggestions.map((suggestion, index) => (
            <option key={index} value={suggestion} />
          ))}
        </datalist>

        <button
          onClick={handleSearch}
          className="search-button"
        >
          Search
        </button>
      </div>

      {/* Main Container */}
      <div className="main-container">
        {loggedIn && (
          <button
            onClick={() => navigate('/update')}
            className="update-button"
          >
            Add/Update Bus Schedule
          </button>
        )}

        {loggedIn && (
          <button
            onClick={generateReports}
            className="report-button"
          >
            Generate Reports
          </button>
        )}

        {searchInitiated && (
          <table className="schedule-table">
            <thead>
              <tr>
                <th>Bus Number</th>
                <th>Destination</th>
                <th>Departure Location</th>
                <th>Route</th>
                <th>Arrival Time</th>
                <th>Departure Time</th>
                <th>Reaching Time</th>
                <th>Route Map</th>
                {loggedIn && <th>Duty Scheduling</th>}
                {loggedIn && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredSchedule.length > 0 ? (
                filteredSchedule.map((bus) => (
                  <tr key={bus.id}>
                    <td>{bus.id}</td>
                    <td>{bus.destination}</td>
                    <td>{bus.departureLocation}</td>
                    <td>{bus.route}</td>
                    <td>{bus.arrivalTime}</td>
                    <td>{bus.departureTime}</td>
                    <td>{bus.reachingTime}</td>
                    <td>
                      <a
                        href={getGoogleMapsUrl(bus.departureLocation, bus.destination)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="map-link"
                      >
                        View Route
                      </a>
                    </td>
                    {loggedIn && (
                      <td>
                        <button
                          className="duty-button"
                          onClick={() => handleDutyScheduling(bus, true)}
                        >
                          Linked Duty
                        </button>
                        <button
                          className="duty-button"
                          onClick={() => handleDutyScheduling(bus, false)}
                        >
                          Unlinked Duty
                        </button>
                      </td>
                    )}
                    {loggedIn && (
                      <td>
                        <button
                          className="edit-button"
                          onClick={() => handleEdit(bus)}
                        >
                          Edit
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={loggedIn ? "10" : "8"}>No results found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {/* Display Generated Reports */}
        {scheduleReports.length > 0 && (
          <div className="reports-container">
            <h3>Utilization Report</h3>
            <table className="report-table">
              <thead>
                <tr>
                  <th>Bus Number</th>
                  <th>Utilization (%)</th>
                </tr>
              </thead>
              <tbody>
                {scheduleReports[0].map(report => (
                  <tr key={report.busNumber}>
                    <td>{report.busNumber}</td>
                    <td>{report.utilization.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>Congestion Report</h3>
            <table className="report-table">
              <thead>
                <tr>
                  <th>Route</th>
                  <th>Congestion Level (%)</th>
                </tr>
              </thead>
              <tbody>
                {scheduleReports[1].map(report => (
                  <tr key={report.route}>
                    <td>{report.route}</td>
                    <td>{report.congestionLevel.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
