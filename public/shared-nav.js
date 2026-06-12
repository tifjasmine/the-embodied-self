(function () {
  const BOOKING_LINK = "https://calendly.com/therapywithtiffany/therapy-session";
  const EMAIL = "theembodiedself@proton.me";

  const nav = document.createElement("header");
  nav.className = "tes-site-nav";
  nav.innerHTML = `
    <a class="tes-site-brand" href="/">The Embodied Self</a>
    <button class="tes-site-menu-button" type="button" aria-label="Open navigation" aria-expanded="false">☰</button>
    <nav class="tes-site-links" aria-label="Primary navigation">
      <a href="/">Home</a>
      <a href="/work-with-me/">Work With Me</a>
      <a href="/about/">About Me</a>
      <a href="/resources/">Resources</a>
      <a href="/the-regulated-mother/">The Regulated Mother</a>
      <a class="tes-site-book" href="${BOOKING_LINK}" target="_blank" rel="noopener noreferrer">Book a Session</a>
    </nav>
  `;

  document.body.prepend(nav);

  const button = nav.querySelector(".tes-site-menu-button");
  const links = nav.querySelector(".tes-site-links");

