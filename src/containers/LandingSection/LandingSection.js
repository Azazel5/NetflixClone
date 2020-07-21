import React, { useState } from "react";
import "./LandingSection.css";

import NavBar from "../../components/Navigation/NavBar/NavBar";
import LandingPage from "../../assets/images/landingPage.jpg";
import { TextField } from "@material-ui/core";
import Button from "../../components/UI/Button/Button";
import DarkComponent from "./DarkComponent/DarkComponent";
import FAQComponent from "./FAQComponent/FAQComponent";
import { Link } from "react-router-dom";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

/**
 * The 'homepage' of this project. Uses an object state to
 * dynamically determine which frequently asked box is open.
 * Renders components like navbars, darkComponents, etc and
 * passes the relevent props whenever needed.
 */
const LandingSection = props => {
  const [faqBoxOpen, setFaqBoxOpen] = useState({});

  const faqOpenHandler = boxNumber => {
    setFaqBoxOpen(prevBoxState => ({
      [boxNumber]: !prevBoxState[boxNumber]
    }));
  };

  return (
    <>
      <div
        className="landingSection"
        style={{ backgroundImage: `url(${LandingPage})` }}
      >
        <NavBar loginButton/>
        <div className="landingTexts">
          <h1>Unlimited movies, TV shows, and more.</h1>
          <h3>Watch anywhere. Cancel anytime.</h3>
          <h3>
            Ready to watch? Enter your email to create or restart your
            membership.
          </h3>
          <TextField
            className="TextField"
            id="filled-basic"
            label="Email Address"
            variant="filled"
            color="secondary"
          />
          <Button 
            link="/" 
            height="34px" 
            width="150px" 
            image 
            icon={faChevronRight}
            backgroundColor="#e50914"
            textColor="#fff"
            buttonSize="xs"
          >
            GET STARTED
          </Button>
        </div>
      </div>
      <div className="tv-section">
        <div className="tv-inner">
          <DarkComponent
            topText="Enjoy on your TV."
            bottomText="Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more."
            image="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png"
          />
        </div>
      </div>

      <div className="tv-section">
        <div className="tv-inner">
          <DarkComponent
            topText="Download your shows to watch offline."
            bottomText="Save your favorites easily and always have something to watch."
            image="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg"
          />
        </div>
      </div>

      <div className="tv-section">
        <div className="tv-inner">
          <DarkComponent
            topText="Watch everywhere."
            bottomText="Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV without paying more."
            image="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile.png"
          />
        </div>
      </div>

      <div className="faq-section">
        <div className="tv-inner">
          <DarkComponent
            fontSize="2.5rem"
            topText="Frequently Asked Questions"
          />
          <FAQComponent
            text="What is Netflix?"
            boxOpen={faqBoxOpen["box1"]}
            faqOpenHandler={() => faqOpenHandler("box1")}
            boxText="Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.
            You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!"
          />
          <FAQComponent
            text="How much does Netflix cost?"
            boxOpen={faqBoxOpen["box2"]}
            faqOpenHandler={() => faqOpenHandler("box2")}
            boxText="Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from US$8.99 to US$15.99 a month. No extra costs, no contracts."
          />
          <FAQComponent
            text="Where can I watch?"
            boxOpen={faqBoxOpen["box3"]}
            faqOpenHandler={() => faqOpenHandler("box3")}
            boxText="Watch anywhere, anytime, on an unlimited number of devices. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.

            You can also download your favorite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere."
          />
          <FAQComponent
            text="How can I cancel?"
            boxOpen={faqBoxOpen["box4"]}
            faqOpenHandler={() => faqOpenHandler("box4")}
            boxText="Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime."
          />
          <FAQComponent
            text="What can I watch on Netflix?"
            boxOpen={faqBoxOpen["box5"]}
            faqOpenHandler={() => faqOpenHandler("box5")}
            boxText="Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want."
          />

          <div className="GetStartedComponent">
            <h3>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h3>
            <TextField
              className="TextField"
              id="filled-basic"
              label="Email Address"
              variant="filled"
              color="secondary"
            />
            <Link to="/">
              <Button 
                height="34px" 
                width="150px" 
                image 
                icon={faChevronRight}
                backgroundColor="#e50914"
                textColor="#fff"
                buttonSize="xs"
              >
                GET STARTED
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingSection;
