import React from 'react';
import Logo from '../assets/Logo.png'
import Styles from './AboutUs.module.css'
import Subtitle from '../assets/Subtitle.jpg'

const AboutUs = () => {
  return (
  <>
    <div className={Styles.aboutUs}>
      <div className={Styles.aboutus}>
        <div className={Styles.HeadPara}>
          <h1>About Us</h1>
          <p>
            We are a platform that bridges the gap between content creators and skilled transcribers,
            with a focus on regional languages. Our mission is to simplify the subtitling process while
            providing students and freelancers with opportunities to showcase their skills and earn flexibly.
          </p>
        </div>
        <div className={Styles.AboutUsLogo}>
        <img
                src={Logo}
                alt="AboutUs"
              />
      </div>
      </div>
    
      <div className={Styles.WhySubtitle}>
      <div className={Styles.SubtitleLogo}>
        <img
                src={Subtitle}
                alt="AboutUs"
              />
      </div>
      <div className={Styles.SubPara}><h2>Why Subtitles are Needed ?</h2>
        <p>
          Subtitles play a crucial role in making content accessible to a wider audience, including those
          who speak different languages or have hearing impairments. They enhance viewer engagement,
          improve content reach, and ensure inclusivity by breaking language barriers.
        </p>
        </div>
        
      </div>
    </div>
    <hr style={{ border: "1px solid black" }}></hr>
  </>
    
  );
};

export default AboutUs;
