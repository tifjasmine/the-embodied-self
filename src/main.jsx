import React from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  Mail,
  Heart,
  Leaf,
  Sparkles,
  Send,
  Menu,
  X,
  Star
} from "lucide-react";
import "./styles.css";

const HERO_IMAGE_URL =
  "https://dl.dropboxusercontent.com/scl/fi/c5m6rewrg2y0ye72c3981/5725e7_4bd68c9a9ec14df5817c59a2d826c15b-mv2.png?rlkey=ceyesmbpu6kpbv2ym7cqlj4x7";

const GOOGLE_REVIEW_LINK =
  "http://search.google.com/local/writereview?placeid=ChIJnXdEjpBbR00RO4nMP55egGE";

const EMAIL = "theembodiedself@proton.me";
const BOOKING_LINK = "https://calendly.com/therapywithtiffany/therapy-session";

const reviews = [
  "Tiffany is a great Therapist. This was exactly what I needed to break free from my insecurities and start truly loving myself. The resources she sent on top of sessions were so helpful in guiding me towards a more positive mindset and self-image. I highly recommend Tiffany to anyone who wants to improve their relationship with themselves.",
  "What can I say about the person who has helped me climb out of the darkness? Her understanding and encouragement can't even be put into words. I am so grateful for her help as I strive to reclaim the person I once strived to be. Thank you.",
  "Tiffany Wright truly is a remarkable human. I have learned and grown so much from her workshops. I'm so glad I found her.",
  "Thank you to Tiffany for coming into our lives and creating this space! I can speak for myself when I say, not being a morning person, I look forward to Sundays now. I am grateful for Tiffany. She came into my life when I was at an all-time low. I am learning something new every Sunday but also from everyone else who joins in. You can never learn enough.",
  "I can't express enough how grateful I am for the support and guidance I've received from Tiffany. Throughout the final stages of college and the various challenges I faced at home, she has been an unwavering pillar of strength and compassion. From the very first session, I felt an instant connection with her. She created a safe and nurturing environment where I could freely express my thoughts and emotions without any judgment. Her genuine empathy and active listening skills made me feel truly heard and understood, providing me with the courage to confront my deepest fears and struggles.",
  "First time joining in the Self Care Sundays with Tiffany. Felt very welcomed and she is very great in guiding the group in discussions and reflections. I highly recommend others to join and acquire in additional helpful to be more present and center in life.",
  "Tiffany’s self-love workshop has been so beneficial to my healing process. Our weekly meetings of meditation and writing has helped me process a lot of the anger I’ve been carrying around. I’m feeling better about myself and life more and more each week. I appreciate Tiffany taking time out of each week to offer these sessions. The space is welcoming, supportive and full of love!",
  "Living Wright has helped me through my darkest times and made me feel like myself again! I would definitely recommend.",
  "Started therapy a few weeks ago, in just one session she helped me regain my confidence and uplifted my spirit. No matter where you are in life a therapist is needed. She let me feel safe to share my thoughts, experiences and issues I may have. She is educated, non-judgmental, understanding, and she definitely helps me to understand my inner thoughts. After 3 sections I am able to heal from multiple traumas, and increase my personal growth. I definitely recommend her 100%. Starting therapy is recommended at any point in life. It’s never too late."
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
        <SelfMethod />
        <Services />
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

      <button className="menuButton" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      <nav className={menuOpen ? "nav navOpen" : "nav"}>
        <a onClick={closeMenu} href="#who">Who This Is For</a>
        <a onClick={closeMenu} href="#method">SELF Method</a>
        <a onClick={closeMenu} href="#services">Services</a>
        <a onClick={closeMenu} href="#community">Community</a>
        <a onClick={closeMenu} href="#reviews">Reviews</a>
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
          <div>
            <strong>12+</strong>
            <span>Years in Practice</span>
          </div>

          <div>
            <strong>400+</strong>
            <span>Clients Supported</span>
          </div>

          <div>
            <strong>PA & NJ</strong>
            <span>Virtual therapy</span>
          </div>
        </div>
      </div>

      <div className="heroVisual">
        <div className="portraitCard">
          <img src={HERO_IMAGE_URL} alt="The Embodied Self therapy visual" />

          <div className="quoteCard quoteTop">
            <p>You are not broken. You are coming home.</p>
            <span>The Embodied Self</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhoThisIsFor() {
  return (
    <section id="who" className="section nearBlack">
      <div className="whoGrid">
        <div>
          <p className="eyebrow mutedEyebrow">Who this is for</p>
          <h2>
            For the woman who looks fine — and feels far from <em>herself.</em>
          </h2>
        </div>

        <div className="whoList">
          <div className="whoItem">
            <span>01</span>
            <div>
              <h3>Emotionally overwhelmed</h3>
              <p>
                Your nervous system feels always on, even when life looks manageable
                from the outside.
              </p>
            </div>
          </div>

          <div className="whoItem">
            <span>02</span>
            <div>
              <h3>Disconnected from yourself</h3>
              <p>
                You know what everyone else needs, but your own voice, desires,
                and needs feel harder to access.
              </p>
            </div>
          </div>

          <div className="whoItem">
            <span>03</span>
            <div>
              <h3>Ready for something deeper</h3>
              <p>
                You want more than coping skills. You want to understand what is
                underneath and create real change.
              </p>
            </div>
          </div>
        </div>
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

function Services() {
  return (
    <section id="services" className="section sageSection">
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
            Weekly 50-minute therapy for anxiety, burnout, self-doubt, emotional
            overwhelm, identity shifts, motherhood, and self-love.
          </p>
          <small>Virtual · PA & NJ</small>
        </article>

        <article className="serviceCard">
          <span>02</span>
          <h3>Therapy Intensives</h3>
          <p>
            Three-hour sessions for deeper emotional work, clarity, and integration
            when you need more space than weekly therapy can offer.
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

        <form
          className="communityForm"
          name="community"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
        >
          <input type="hidden" name="form-name" value="community" />

          <p className="hidden">
            <label>
              Don’t fill this out: <input name="bot-field" />
            </label>
          </p>

          <label>
            First name
            <input type="text" name="name" placeholder="Your name" />
          </label>

          <label>
            Email
            <input type="email" name="email" placeholder="you@email.com" />
          </label>

          <label>
            What have you been thinking about?
            <textarea
              name="reflection"
              placeholder="Share a question, reflection, or something you want support around..."
            />
          </label>

          <button className="button dark" type="submit">
            Submit Reflection <Send size={16} />
          </button>
        </form>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section id="reviews" className="section nearBlack">
      <div className="sectionTop">
        <div>
          <p className="eyebrow terra">Google reviews</p>
          <h2>
            Words from people who have felt supported in this <em>work.</em>
          </h2>
        </div>

        <a className="button clay" href={GOOGLE_REVIEW_LINK} target="_blank" rel="noreferrer">
          Leave a Review
        </a>
      </div>

      <div className="reviewStrip">
        {reviews.map((review, index) => (
          <article className="reviewCard" key={index}>
            <div>
              <div className="stars">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>

              <p>“{review}”</p>
            </div>

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

        <form
          className="contactForm"
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
        >
          <input type="hidden" name="form-name" value="contact" />

          <p className="hidden">
            <label>
              Don’t fill this out: <input name="bot-field" />
            </label>
          </p>

          <h3>Send a message</h3>

          <label>
            Your name
            <input type="text" name="name" />
          </label>

          <label>
            Email address
            <input type="email" name="email" />
          </label>

          <label>
            Message
            <textarea name="message" />
          </label>

          <button className="button dark" type="submit">
            Send Message
          </button>
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
