import { css } from '@emotion/react';
// import Link from 'next/link';
// import Footer from '../components/Footer';
// import Header from '../components/Header';
// const gallery = css`
//   background-color: #c4c4c4;
//   margin-top: 25px;
//   main {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     flex-direction: column;
//     gap: 20px;
//     margin-top: 25px;
//     border-radius: 25px;
//   }
// `;
import Footer from '../components/Footer';
import Header from '../components/Header';
// export default function Gallery() {
//   return (
//     <div css={gallery}>
//       <Header />
//       <main>
//         <h2>Gallery</h2>
//         <img
//           src="/images/geesebar1.jpeg"
//           alt="geesebar"
//           height="400px"
//           width="500px"
//         />
//         <img
//           src="/images/geesebar2.jpg"
//           alt="geesebar"
//           height="400px"
//           width="500px"
//         />
//         {/* <img
//           src="/images/guinness.jpg"
//           alt="guinness"
//           height="400px"
//           width="500px"
//         /> */}
//         <img
//           src="/images/poolroom.jpeg"
//           alt="poolroom"
//           height="400px"
//           width="500px"
//         />
//       </main>
//       <Footer />
//     </div>
//   );
// }
import ImageSlider from '../components/ImageSlider';
import { SliderData } from '../components/SliderData';

const main = css`
  background: #c4c4c4;
  overflow-x: hidden;

  /* img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 80%;
    height: 90%;
    border-radius: 15px;
  }*/
`;
function App() {
  return (
    <div>
      <Header />
      <main css={main}>
        <div>
          <ImageSlider slides={SliderData} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
