import { css } from '@emotion/react';
import Link from 'next/link';
import Footer from '../components/Footer';
import Header from '../components/Header';

const main = css`
  background-image: linear-gradient(#c4c4c4, grey, #c4c4c4);

  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 80%;
    height: 90%;
    border-radius: 15px;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;
export default function Home() {
  return (
    <div>
      <Header />
      <main css={main}>
        <div>
          <img src="/images/bar3.jpeg" alt="bar" width="75%" height="500px" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
