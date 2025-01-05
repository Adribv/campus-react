import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../lib/sanity'; // Import the Sanity client

const RegisterPage = () => {
  const { slug } = useParams(); // Get the slug from the URL
  const [event, setEvent] = useState(null);

  // Fetch event details based on the slug
  useEffect(() => {
    if (!slug) return;

    const query = `*[_type == "event" && slug.current == $slug][0]{
      _id,
      title,
      startDate,
      endDate,
      description,
      venue,
      registrationRequired,
      registrationDeadline,
      maxParticipants,
      fee,
      status
    }`;

    client.fetch(query, { slug }).then((data) => setEvent(data));
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    // Prepare registration data according to your schema
    const registrationData = {
      _type: 'registration', // Document type
      event: {
        _type: 'reference',
        _ref: event._id, // Reference to the event
      },
      studentName: formData.get('studentName'),
      email: formData.get('email'),
      registrationNumber: formData.get('registrationNumber'),
      department: formData.get('department'),
      phoneNumber: formData.get('phoneNumber'),
      registrationDate: new Date().toISOString(), // Automatically set the registration date
      paymentStatus: 'pending', // Default payment status
      paymentId: formData.get('paymentId') || '', // Optional payment ID
    };

    // Submit registration data to Sanity
    try {
      await client.create(registrationData);
      alert('Registration successful!');
    } catch (error) {
        console.error('Registration failed:', error.message);
        alert(`Registration failed: ${error.message}`);
    }
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Register for {event.title}</h1>
      <h1>Register for {event.title}</h1>
      <p>{event.description}</p>
      <p>Start Date: {new Date(event.startDate).toLocaleString()}</p>
      <p>Venue: {event.venue}</p>
      <p>Registration Deadline: {new Date(event.registrationDeadline).toLocaleString()}</p>
      <p>Fee: {event.fee ? `$${event.fee}` : 'Free'}</p>
      <p>Max Participants: {event.maxParticipants}</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="studentName">Student Name:</label>
        <input type="text" id="studentName" name="studentName" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="registrationNumber">Registration Number:</label>
        <input type="text" id="registrationNumber" name="registrationNumber" required />

        <label htmlFor="department">Department:</label>
        <input type="text" id="department" name="department" required />

        <label htmlFor="phoneNumber">Phone Number:</label>
        <input type="text" id="phoneNumber" name="phoneNumber" required />

        <label htmlFor="paymentId">Payment ID (optional):</label>
        <input type="text" id="paymentId" name="paymentId" />

        <button type="submit">Submit Registration</button>
      </form>
    </div>
  );
};

export default RegisterPage;