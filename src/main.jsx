// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  Mail,
  Heart,
  Sparkles,
  Star,
  Send,
  Menu,
  X
} from "lucide-react";
import "./styles.css";

const HERO_IMAGE_URL =
  "https://dl.dropboxusercontent.com/scl/fi/c5m6rewrg2y0ye72c3981/5725e7_4bd68c9a9ec14df5817c59a2d826c15b-mv2.png?rlkey=ceyesmbpu6kpbv2ym7cqlj4x7";

const GOOGLE_REVIEW_LINK =
  "http://search.google.com/local/writereview?placeid=ChIJnXdEjpBbR00RO4nMP55egGE";

const EMAIL = "theembodiedself@proton.me";
const BOOKING_LINK = "https://calendly.com/therapywithtiffany/therapy-session";

const reviews = [
  "Tiffany is a great Therapist. This was exactly what I needed to break free from my insecurities and start truly loving myself.",
  "Her understanding and encouragement can't even be put into words. I am so grateful for her help.",
  "Tiffany Wright truly is a remarkable human. I have learned and grown so much from her workshops.",
  "The space is welcoming, supportive and full of love!",
  "She created a safe and nurturing environment where I could freely express my thoughts and emotions without judgment."
];

function App() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site">
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} closeMenu={closeMenu} />
      <main>
        <Home />
        <WhoThisIsFor />
        <Services />
        <SelfMethod />
        <Community />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Header({ menuOpen, setMenuOpen, closeMenu }) {
  return (
    <header className="header">
      <a href="#home" className="brand" onClick={closeMenu}>
        The Embodied Self
      </a>

      <button className="menuButton" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      <nav className={menuOpen ? "nav navOpen" : "nav"}>
        <a onClick={closeMenu} href="#who-this-is-for">Who This Is For</a>
        <a onClick={closeMenu} href="#services">Services</a>
        <a onClick={closeMenu} href="#method">SELF Method</a>
        <a onClick={closeMenu} href="#community">Community</a>
        <a onClick={closeMenu} href="#contact">Contact</a>
        <a onClick={closeMenu} className="navButton" href={BOOKING_LINK} target="_blank" rel="noreferrer">
          Book a Session
        </a>
      </nav>
    </header>
  );
}

function Home() {
  return (
    <section id="home" className="hero">
      <div className="heroText">
        <p className="eyebrow">Virtual therapy · Pennsylvania & New Jersey</p>
        <h1>
          Come back <span>to yourself.</span>
        </h1>
        <p className="lede">
          Therapy for women carrying emotional overload, burnout, self-disconnection,
          and the quiet weight of holding everything together.
        </p>

        <div className="actions">
          <a className="button dark" href={BOOKING_LINK} target="_blank" rel="noreferrer">
            Book a Session
          </a>
          <a className="textLink" href="#services">
            Explore services <ArrowRight size={16} />
          </a>
        </div>

        <div className="stats">
          <div><strong>PA & NJ</strong><span>Virtual therapy</span></div>
          <div><strong>12+</strong><span>Years in practice</span></div>
          <div><strong>400+</strong><span>Clients supported</span></div>
        </div>
      </div>

      <div className="heroVisual">
        <div className="portraitCard">
          <img src={HERO_IMAGE_URL} alt="The Embodied Self therapy visual" />
          <div className="quoteCard">
            <p>You are not broken. You are coming home.</p>
            <span>The Embodied Self</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhoThisIsFor() {
  const items = [
    [
      "Emotionally overwhelmed",
      "Your nervous system feels always on, even when life looks manageable from the outside."
    ],
    [
      "Disconnected from yourself",
      "You know what everyone else needs, but your own voice, desires, and needs feel harder to access."
    ],
    [
      "Ready for something deeper",
      "You want more than coping skills. You want to understand what is underneath and create real change."
    ]
  ];

  return (
    <section id="who-this-is-for" className="section whoSection">
      <div className="whoWrap">
        <div className="whoIntro">
          <p className="eyebrow mutedEyebrow">Who this is for</p>
          <h2>
            For the woman who looks fine — and feels far from <em>herself.</em>
          </h2>
        </div>

        <div className="whoList">
          {items.map(([title, text], index) => (
            <article className="whoItem" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="section darkSection">
      <div className="sectionTop">
        <div>
          <p className="eyebrow terra">Therapeutic offerings</p>
          <h2>Support that meets you where you are.</h2>
        </div>
        <a className="button clay" href={BOOKING_LINK} target="_blank" rel="noreferrer">
          Book a Session
        </a>
      </div>

      <div className="cardGrid three">
        <article className="serviceCard">
          <span>01</span>
          <h3>Outpatient Therapy</h3>
          <p>
            Weekly 50-minute therapy for anxiety, burnout, self-doubt, emotional overwhelm,
            identity shifts, motherhood, and self-love.
          </p>
          <small>Virtual · PA & NJ</small>
        </article>

        <article className="serviceCard">
          <span>02</span>
          <h3>Therapy Intensives</h3>
          <p>
            Three-hour sessions for deeper emotional work, clarity, and integration when
            you need more space than weekly therapy can offer.
          </p>
          <small>Virtual · PA & NJ</small>
        </article>

        <article className="serviceCard">
          <span>03</span>
          <h3>Mindful Movement</h3>
          <p>
            Somatic support using grounding, breath, and movement to help you reconnect
            with your body and regulate your nervous system.
          </p>
          <small>No location restrictions</small>
        </article>
      </div>
    </section>
  );
}

function SelfMethod() {
  const phases = [
    ["S", "Shed the Story", "Identify the beliefs, roles, and survival patterns that taught you who you had to be."],
    ["E", "Embrace the Fire", "Learn to feel anger, grief, shame, fear, and resentment without being consumed by them."],
    ["L", "Liberate Your Voice", "Reconnect with needs, boundaries, truth, desire, and the parts of you that learned to stay quiet."],
    ["F", "Forge a New Way", "Practice self-trust, emotional steadiness, and a more rooted relationship with yourself."]
  ];

  return (
    <section id="method" className="section cream">
      <div className="sectionTop">
        <div>
          <p className="eyebrow terra">The SELF Method</p>
          <h2>A framework for learning to love your SELF.</h2>
        </div>
        <p className="topCopy">
          The SELF Method is the heart of this work: a four-phase therapy framework
          for understanding what shaped you and building a more honest relationship
          with yourself.
        </p>
      </div>

      <div className="methodGrid">
        {phases.map(([letter, title, text]) => (
          <article className="methodCard" key={letter}>
            <div className="bigLetter">{letter}</div>
            <p className="phase">Phase {letter}</p>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Community() {
  return (
    <section id="community" className="section cream">
      <div className="split">
        <div>
          <p className="eyebrow terra">Community reflections</p>
          <h2>A soft place for honest questions.</h2>
          <p>
            This space will hold anonymous community questions, therapist reflections,
            and gentle tools for the things so many people carry quietly.
          </p>
          <p>
            Later, this section can connect to Airtable so approved submissions display
            automatically from your database.
          </p>
        </div>

        <form className="communityForm" onSubmit={(e) => e.preventDefault()}>
          <label>
            First name
            <input type="text" placeholder="Your name" />
          </label>

          <label>
            Email
            <input type="email" placeholder="you@email.com" />
          </label>

          <label>
            What have you been thinking about?
            <textarea placeholder="Share a question, reflection, or something you want support around..." />
          </label>

          <button className="button dark" type="submit">
            Submit Reflection <Send size={16} />
          </button>

          <p className="formNote">
            This form is a placeholder until we connect Airtable or Google Apps Script.
          </p>
        </form>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section id="reviews" className="section darkSection">
      <div className="sectionTop">
        <div>
          <p className="eyebrow terra">Google reviews</p>
          <h2>Words from people who have felt supported in this work.</h2>
        </div>
        <a className="button clay" href={GOOGLE_REVIEW_LINK} target="_blank" rel="noreferrer">
          Leave a Review
        </a>
      </div>

      <div className="reviewStrip">
        {reviews.map((review, index) => (
          <article className="reviewCard" key={index}>
            <div className="stars">
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
            </div>
            <p>“{review}”</p>
            <small>Google review highlight</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section contactSection">
      <div className="split">
        <div>
          <p className="eyebrow terra">Get in touch</p>
          <h2>Let’s start with a conversation.</h2>
          <p>
            Reaching out is often the hardest step. Whether you have questions about
            therapy, intensives, mindful movement, or fit, you are welcome to begin here.
          </p>

          <div className="contactList">
            <a href={`mailto:${EMAIL}`}>
              <Mail size={18} /> {EMAIL}
            </a>
            <a href={BOOKING_LINK} target="_blank" rel="noreferrer">
              <Heart size={18} /> Book a consultation
            </a>
            <span>
              <Sparkles size={18} /> Virtual therapy in Pennsylvania & New Jersey
            </span>
          </div>
        </div>

        <form className="contactForm" onSubmit={(e) => e.preventDefault()}>
          <h3>Send a message</h3>

          <label>
            Your name
            <input type="text" />
          </label>

          <label>
            Email address
            <input type="email" />
          </label>

          <label>
            Message
            <textarea />
          </label>

          <button className="button dark" type="submit">
            Send Message
          </button>

          <p className="formNote">
            Placeholder form. We can connect this to Netlify Forms, Airtable, or Google Apps Script next.
          </p>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>The Embodied Self</p>
      <p>Virtual therapy in PA & NJ · © {new Date().getFullYear()}</p>
    </footer>
  );
}

createRoot(document.getElementById("root")).render(<App />);
