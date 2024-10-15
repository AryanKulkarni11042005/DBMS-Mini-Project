import {useState, useEffect} from 'react'
import axios from 'axios'
import './container.css'

axios.defaults.baseURL = 'http://localhost:5000';


const Table = () => {
    const [lectures, setLectures] = useState([]);
    
    const fetchLectures = async () => {
        try {
          const response = await axios.get("http://localhost:5000/lectures");
          setLectures(response.data);
        } catch (err) {
          console.error(err.message);
        }
      };
      useEffect(() => {
        fetchLectures();  // Fetch lectures when the component mounts
      }, []);
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            
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
              
              <td>{lecture.class_aloted}</td>
              <td>{lecture.subject}</td>
              <td>{lecture.start_time}</td>
              <td>{lecture.end_time}</td>
              <td>{lecture.day_of_week}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
