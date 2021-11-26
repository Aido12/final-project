import { css } from '@emotion/react';
import { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const back = css`
  background-image: url('/images/drinks2.jpeg');
`;
const form = css`
  background: linear-gradient(#c4c4c4, grey, #c4c4c4);
  /* display: flex;

  color: black;
  text-align: center;
  justify-content: center; */
  text-shadow: 100px 100px 100px rgba(0, 0, 0, 0.25);
  background-image: linear-gradient(#c4c4c4, grey, #c4c4c4);
  /* width: 50%; */
  margin-right: 50%;
  padding: 12px 20px;
  margin: 8px 0;
  margin-left: 20%;
  margin-right: 20%;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-sizing: border-box;
  input {
    width: 100%;
    padding: 10px;
    border-radius: 10px;
  }

  button {
    width: 100%;
    background-image: linear-gradient(to right, grey, #c4c4c4, grey);
    color: black;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 20px;
  }
`;

export default function Reservations() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('');
  const [date, setDate] = useState('');
  return (
    <div>
      <Header />
      <div css={back}>
        <form css={form}>
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
          <button>Submit</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
