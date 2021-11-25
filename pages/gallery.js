import { css } from '@emotion/react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ImageSlider from '../components/ImageSlider';
import { SliderData } from '../components/SliderData';

const main = css`
  background-image: linear-gradient(#c4c4c4, grey, #c4c4c4);
  overflow-x: hidden;
`;
function App() {
  return (
    <div>
      <Header />
      <main css={main}>
        {/* <div> */}
        <ImageSlider slides={SliderData} />
        {/* </div> */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
