import { useState, useEffect } from 'react';

import axios from "axios";
import Table from './Table';
import Navbar from './Navbar';
import './container.css';

const AdminDashboard = () => {
const [lectures, setLectures] = useState([]);
  const [message, setMessage] = useState('');
   

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const response = await axios.get('http://localhost:3001/lectures');
        if (response.data.message) {
          setMessage(response.data.message);
        } else {
          setLectures(response.data);
        }
      } catch (error) {
        console.error('Error fetching lectures:', error);
        setMessage('Error fetching lectures');
      }
    };

    fetchLectures();
  }, []);

  return (
    <div>
      <Navbar  />
      <div className="page">
        <h1>Today's Schedule</h1>
        {message ? (
          <p style={{color: "red"}}>{message}</p>
        ) : (
          <table className="table">
        <thead>
          <tr>
            <th>ID No</th>
            <th>Class Alloted</th>
            <th>Subject</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Day of Week</th>
            
          </tr>
        </thead>
        <tbody>
          {lectures.map((lecture, index) => (
            <tr key={index}>
              <td>{lecture.id_no}</td>
              <td>{lecture.class_alloted}</td>
              <td>{lecture.subject}</td>
              <td>{lecture.start_time}</td>
              <td>{lecture.end_time}</td>
              <td>{lecture.day_of_week}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
