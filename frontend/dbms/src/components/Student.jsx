import {useState, useEffect} from 'react';
import axios from 'axios';

const Student = () => {
  const [students, setStudent] = useState([]);

  const fetchStudent = async () => {
    try {
      const response = await axios.get("http://localhost:3001/student");
      setStudent(response.data);
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
      <h1>Student</h1>
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll NO</th>
            <th>Marks</th>
            <th>Division</th>
            <th>Phone No</th>
            <th>DOB</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.rollno}>
              <td>{student.fname} {student.lname}</td>
              <td>{student.rollno}</td>
              <td>{student.marks}</td>
              <td>{student.division}</td>
              <td>{student.phone_no}</td>
              <td>{student.dob}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Student
