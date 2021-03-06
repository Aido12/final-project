import { css } from '@emotion/react';
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
    list-style: none;
    margin-left: 100px;
    margin-right: 80px;
    width: 40%;
    padding: 10px;
    border-radius: 10px;
  }
`;
const match = css`
  white-space: nowrap;

  text-overflow: clip;
`;

export default function LiveSport(props) {
  return (
    <div css={background}>
      <Header />
      <main css={bev}>
        <div>
          <h1> Sports</h1>
          <h3>Football</h3>
          <ul>
            {props.sports.map((sport) => {
              return (
                <li key={sport.id}>
                  <li>{sport.date} </li>
                  <li>{sport.time} </li>
                  <li css={match}>{sport.match} </li>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const { getSports } = await import('../util/database');

  const sports = await getSports();

  return {
    props: { sports },
  };
}
