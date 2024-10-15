import {useState, useEffect} from 'react'
import axios from 'axios'
const Teacher = () => {
  const [teachers, setTeacher] = useState([]);

  const fetchStudent = async () => {
    try {
      const response = await axios.get("http://localhost:3001/teacher");
      setTeacher(response.data);
      console.log(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);
  return (
    <div className='page'>
      <h1>Teacher </h1>
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>ID No</th>
            <th>Email</th>
            <th>Subject</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id_no}>
              <td>{teacher.fname} {teacher.lname}</td>
              <td>{teacher.id_no}</td>
              <td>{teacher.email}</td>
              <td>{teacher.subject}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Teacher
