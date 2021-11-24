import { css } from '@emotion/react';
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
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [match, setMatch] = useState('');
  const [sportList, setSportList] = useState(props.sports);

  async function insertSport() {
    console.log(date, time, match);
    const sportResponse = await fetch(`/api/sportsdiary/index`, {
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

  async function deleteSport(id) {
    const sportResponse = await fetch(
      `${props.baseUrl}/api/sportsdiary/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const deletedSport = await sportResponse.json();
    const newSport = sportList.filter((user) => user.id !== deletedSport.id);
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

    const updatedSport = await sportResponse.json();

    const newSport = [...sportList];

    const outdatedSport = newSport.find(
      (sport) => sport.id === updatedSport.id,
    );

    outdatedSport.name = updatedSport.name;
    outdatedSport.favoriteColor = updatedSport.favoriteColor;

    setSportList(newSport);
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
              insertSport(date, time, match);
            }}
          >
            Submit
          </button>
        </form>
        {/* <label>
          update Date:
          <input
            value={updateSport}
            onChange={(e) => setUpdateSport(e.currentTarget.value)}
          />
        </label> */}
      </main>
      <Footer />
    </div>
  );
}

// export async function getServerSideProps() {}
