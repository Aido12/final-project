import Link from 'next/link';
import { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Number from '../components/Number';

export default function Reservations() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  return (
    <div>
      <Header />

      <form>
        <label>
          First Name
          <input
            value={firstname}
            onChange={(event) => setFirstname(event.currentTarget.value)}
          />
        </label>
        <label>
          Last Name
          <input
            value={lastname}
            onChange={(event) => setLastname(event.currentTarget.value)}
          />
        </label>
        <label>
          Email
          <input
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
          />
        </label>
        {/* <label>
          Username
          <input
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
          />
        </label>
        <label></label>
        <button onClick={() => router.push(destination)}>Submit</button> */}
        <Number />
      </form>
      <Footer />
    </div>
  );
}
