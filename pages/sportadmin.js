import { css } from '@emotion/react';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const background = css`
  background-image: url('/images/drinks2.jpeg');
`;
const bev = css`
  background: linear-gradient(#c4c4c4, grey, #c4c4c4);
  display: flex;
  color: black;
  text-align: center;
  justify-content: center;
  margin-left: 20%;
  margin-right: 20%;
  border-radius: 20px;
  padding: 2px;
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: 600;
  text-shadow: 100px 100px 100px rgba(0, 0, 0, 0.25);
  background-image: linear-gradient(grey, #c4c4c4);

  li {
    list-style: none;
  }
  ul {
    margin-left: 100px;
    margin-right: 100px;
  }
`;

export default function Sportsform(props) {
  const router = useRouter();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [match, setMatch] = useState('');
  const [sportList, setSportList] = useState(props.sports);

  async function insertSport() {
    console.log(date, time, match);
    const sportResponse = await fetch('/api/sportsdiary/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ date, time, match }),
    });

    const sport = await sportResponse.json();
    const newSport = [...sportList, sport];
    setSportList(newSport);
  }

  async function updateSport(id, newDate, newTime, newMatch) {
    const sportResponse = await fetch(
      `${props.baseUrl}/api/sportsdiary/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sportDate: newDate,
          sportTime: newTime,
          sportMatch: newMatch,
        }),
      },
    );
  }
  return (
    <div css={background}>
      <Header />
      <main css={bev}>
        <h1>Football</h1>
        <form>
          <label>
            Date
            <input
              value={date}
              type="date"
              onChange={(event) => setDate(event.currentTarget.value)}
            />
          </label>
          <label>
            Time
            <input
              value={time}
              type="time"
              onChange={(event) => setTime(event.currentTarget.value)}
            />
          </label>
          <label>
            Match
            <input
              value={match}
              onChange={(event) => setMatch(event.currentTarget.value)}
            />
          </label>

          <button
            onClick={(event) => {
              event.preventDefault();
            }}
          >
            Submit
          </button>
        </form>
        <ul>
          {props.sports.map((sport) => {
            return (
              <div key={sport.date}>
                <li>{sport.date} </li>
                <li>{sport.time} </li>
                <li>{sport.match} </li>
                <button
                  onClick={async (event) => {
                    event.preventDefault();
                    await fetch(`/api/sportsdiary`, {
                      method: 'DELETE',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                    });
                    router.push(`/livesports`);
                  }}
                >
                  DELETE
                </button>
              </div>
            );
          })}
        </ul>
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const { getSports } = await import('../util/database');

  const sports = await getSports();
  console.log(sports);
  return {
    props: { sports },
  };
}
