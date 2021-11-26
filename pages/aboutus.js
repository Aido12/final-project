import { css } from '@emotion/react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const back = css`
  background-image: url('/images/drinks2.jpeg');
`;
const image = css`
  background-image: url('/images/bar1.jpeg');
  /* background-color: grey; */
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 15px;
  width: 75%;
  height: 100vh;
  margin-top: 0px;
`;
const about = css`
  /* background: #c4c4c4;
  background-image: url('/images/drinks2.jpeg'); */
  color: #000068;
  text-align: center;
  margin-left: 20%;
  margin-right: 20%;
  border-radius: 20px;
  padding: 2px;
  margin-top: 0px;
  margin-bottom: 20px;
  font-weight: bold;
  text-shadow: 100px 100px 100px rgba(0, 0, 0, 0.25);
`;

export default function AboutUs() {
  return (
    <div css={back}>
      <Header />
      <div css={image}>
        <div css={about}>
          <h2>About Us</h2>
          <p>
            The Wild Geese Bar is The Oak’s sister bar directly next door. The
            Wild Geese offers a range of different local and international
            drinks and a ‘snack style’ food menu prepared from The Oak. The Wild
            Geese has a designated games room where you can play pool on our
            billiards table, or you can play rounds on our dart board, all free
            of charge. We also offer the space for private events in our front
            room which seats up to 30 people. Catering for such events is also
            possible at a price based on how many participants your party is
            reserved for. With good music, good vibes, and good drinks being
            poured, we hope to see you soon!
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
