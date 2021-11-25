import Link from 'next/link';
import { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Number from '../components/Number';

export default function Reservations() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('');
  const [date, setDate] = useState('');
  return (
    <div>
      <Header />

      <form>
        <label>
          First Name & Last Name
          <input
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
          />
        </label>
        <label>
          Email
          <input
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
          />
        </label>
        <label>
          No. of People
          <input
            value={guests}
            type="number"
            onChange={(event) => setGuests(event.currentTarget.value)}
          />
        </label>
        <label>
          time
          <input
            value={time}
            type="time"
            onChange={(event) => setTime(event.currentTarget.value)}
          />
        </label>
        <label>
          Date
          <input
            value={date}
            type="date"
            onChange={(event) => setDate(event.currentTarget.value)}
          />
        </label>
        <button
            onClick={(event) => {
              event.preventDefault();
              ();
            }}
          >
            Submit
          </button>
      </form>
      <Footer />
    </div>
  );
}
