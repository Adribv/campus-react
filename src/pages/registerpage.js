import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../lib/sanity';

export default function RegistrationPage() {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    registrationNumber: '',
    department: '',
    phoneNumber: '',
  });
  const [status, setStatus] = useState('');

  useEffect(() => {
    const query = `*[_type == "event" && slug.current == $slug][0]{
      title,
      description,
      startDate,
      endDate,
      venue,
      registrationRequired,
      registrationDeadline,
      maxParticipants,
      fee,
      status
    }`;

    client.fetch(query, { slug }).then((data) => setEvent(data));
  }, [slug]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');

    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, eventTitle: event.title, registrationDate: new Date() }),
      });

      if (response.ok) {
        setStatus('Registration successful!');
        setFormData({
          studentName: '',
          email: '',
          registrationNumber: '',
          department: '',
          phoneNumber: '',
        });
      } else {
        const error = await response.text();
        setStatus(`Failed: ${error}`);
      }
    } catch (error) {
      setStatus('Failed: Unable to register. Try again later.');
    }
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Register for {event.title}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="studentName"
          placeholder="Student Name"
          value={formData.studentName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="registrationNumber"
          placeholder="Registration Number"
          value={formData.registrationNumber}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>{status}</p>
    </div>
  );
}