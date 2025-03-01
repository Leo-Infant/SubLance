import React, { useEffect, useState } from 'react';
import styles from './Homepage.module.css';
import Website from './img/website.jpg';
import Subtitle from './img/Subtitle.jpg';
import vocals from './img/vocals.jpg';
import Logo from '../assets/logo.png';


const Homepage = () => {
  const [isNavActive, setIsNavActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModal , setIsModal] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 4) {
        setIsScrolled(true);
        setIsModal(true);
      } else {
        setIsScrolled(false);
        setIsModal(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleNav = () => {
    setIsNavActive(!isNavActive);
  };

  return (
    <div className={styles.wrapper}>
        <div className={styles.container}>
        <nav className={`${styles.nav} ${isScrolled ? styles.navScrolled : ''} ${isNavActive ? styles.navActive : ''}`}>
            <ul>
            <li><a href="#" >Home</a></li>
            <li><a href="/login" >Signin</a></li>
            <li><a href="/register" >Signup</a></li>
            </ul>
        </nav>

        {isModal && (
          <div className={styles.logo}>
          <img src={Logo} alt="SounDAW" />
        </div> 
        )}
    
{/* 
        <div className={styles.logo}>
            <img src={Logo} alt="SounDAW" />
        </div> */}

        <div className={`${styles.menuBtn} ${isNavActive ? styles.menuBtnActive : ''}`} onClick={toggleNav}>
            +
        </div>

        <header className={styles.header}>
            <h1>SubLance</h1>
        </header>

        <section className={styles.section}>
            <div className={styles.description}>
            <h3>Why Subtitles are Needed ?</h3>
            <p>Subtitles play a crucial role in making content accessible to a
              wider audience, including those who speak different languages or
              have hearing impairments. They enhance viewer engagement, improve
              content reach, and ensure inclusivity by breaking language
              barriers.</p>
            </div>
            <div className={styles.image}>
            <img src={Subtitle} alt="Why Subtitles are needed" />
            </div>
        </section>

        <section className={styles.section}>
            <div className={styles.description}>
            <h3>Future of Creator & Freelancer Growth </h3>
            <p>The future of content and freelancing is driven by rising digital demand and remote work.
               While AI aids creation, human creativity remains key. 
              Expanding gig opportunities connect global talent, with platforms playing a vital role in seamless collaboration and growth.</p>
            </div>
            <div className={styles.image}>
            <img src={vocals} alt="Future of Creator & Freelancer"/>
            </div>
        </section>

        <section className={styles.section}>
            <div className={styles.description}>
            <h3>About Us</h3>
            <p>We are a platform that bridges the gap between content creators
              and skilled transcribers, with a focus on regional languages. Our
              mission is to simplify the subtitling process while providing
              students and freelancers with opportunities to showcase their
              skills and earn flexibly.</p>
            </div>
            <div className={styles.image}>
            <img src={Website} alt="About Us" />
            </div>
        </section>
            <iv></iv>
        <footer className={styles.footer}>
            SubLance &copy; 2025
        </footer>
        </div>
    </div>
  );
};

export default Homepage;