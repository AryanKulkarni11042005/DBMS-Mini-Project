import { useState, useEffect } from 'react';
import axios from 'axios';
import './container.css'

function Lecture() {
  const [lectures, setLectures] = useState([]); // State to store lecture data
  const [newLecture, setNewLecture] = useState({
    id_no: '',
    class_aloted: '',
    subject: '',
    start_time: '',
    end_time: '',
    day_of_week: ''
  });
  const [message, setMessage] = useState('');
  // Fetch existing lectures from the backend
  const fetchLectures = async () => {
    try {
      const response = await axios.get("http://localhost:3001/schedule");
      const data = Array.isArray(response.data) ? response.data : [];
      if (response.data.message) {
        setMessage(response.data.message);
      } else {
        setLectures(data);
      }
    } catch (err) {
      console.error(err.message);
      setMessage('Error fetching lectures');
    }
  };

  useEffect(() => {
    fetchLectures();  // Fetch lectures when the component mounts
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setNewLecture({
      ...newLecture,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
  
    console.log("Submitting form data:", newLecture); // Log the form data before sending
  
    try {
      const response = await axios.post("http://localhost:3001/schedule", newLecture);
      setLectures([...lectures, response.data]);
  
      console.log("Response from server:", response.data); // Log the server's response
  
      setNewLecture({
        id_no: '',
        class_aloted: '',
        subject: '',
        start_time: '',
        end_time: '',
        day_of_week: ''
      });
    } catch (err) {
      console.error("Error adding lecture:", err.message);
    }
  };
  const deleteLecture = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/schedule/${id}`);
      setLectures(lectures.filter(lecture => lecture.id_no !== id));
    } catch (err) {
      console.error('Error deleting lecture:', err);
      setMessage('Error deleting lecture');
    }
  };
  

  return (
    <div className='page'>
        <h1>Lecture Schedule</h1>
        <table className="table">
        <thead>
          <tr>
            <th>ID No</th>
            <th>Class Alloted</th>
            <th>Subject</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Day of Week</th>
            <th>Actions</th>
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
              <td>
                <button onClick={() => deleteLecture(lecture.id_no)} className='submit'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {message && <p>{message}</p>}
      <h1>Add New Lecture</h1>

      {/* Form for adding a new lecture */}
      <form onSubmit={handleSubmit}>
        <label>
          Teacher ID:
          <input
            type="text"
            name="id_no"
            value={newLecture.id_no}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Class Alloted:
          <input
            type="text"
            name="class_aloted"
            value={newLecture.class_aloted}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Subject:
          <input
            type="text"
            name="subject"
            value={newLecture.subject}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Start Time:
          <input
            type="time"
            name="start_time"
            value={newLecture.start_time}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          End Time:
          <input
            type="time"
            name="end_time"
            value={newLecture.end_time}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Day of Week:
          <select
            name="day_of_week"
            value={newLecture.day_of_week}
            onChange={handleChange}
            required
          >
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
          </select>
        </label>
        <br />
        <button type="submit" className='submit'>Add Lecture</button>
      </form>

      {/* Table to display lectures */}
      
    </div>
  );
}

export default Lecture;