(function () {
  const bookingLink = "https://calendly.com/therapywithtiffany/therapy-session";
  const email = "theembodiedself@proton.me";

  const nav = document.createElement("header");
  nav.className = "tes-site-nav";
  nav.innerHTML = `
    <a class="tes-site-brand" href="/">The Embodied Self</a>
    <button class="tes-site-menu" type="button" aria-expanded="false" aria-controls="tesSiteLinks">
      Menu
    </button>
    <nav class="tes-site-links" id="tesSiteLinks" aria-label="Main navigation">
      <a href="/">Home</a>
      <a href="/work-with-me/">Work With Me</a>
      <a href="/about/">About Me</a>
      <a href="/resources/">Resources</a>
      <a href="/the-regulated-mother/">The Regulated Mother</a>
      <a class="tes-site-book" href="${bookingLink}" target="_blank" rel="noopener noreferrer">Book a Session</a>
    </nav>
  `;

  document.body.insertBefore(nav, document.body.firstChild);

  const menuButton = nav.querySelector(".tes-site-menu");
  const links = nav.querySelector(".tes-site-links");

  menuButton.addEventListener("click", function () {
    const isOpen = links.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.textContent = isOpen ? "Close" : "Menu";
  });

  const footer = document.createElement("footer");
  footer.className = "tes-global-footer";
  footer.innerHTML = `
    <div class="tes-global-footer-inner">
      <div class="tes-global-footer-grid">
        <div>
          <div class="tes-global-footer-label">Get in touch</div>
          <h2>Let’s start with a <em>conversation.</em></h2>
        </div>
        <div>
          <p>
            Whether you have questions about therapy, intensives, mindful movement,
            or fit, you are welcome to begin here. Reaching out is often the hardest step.
          </p>
          <div class="tes-global-footer-actions">
            <a href="${bookingLink}" target="_blank" rel="noopener noreferrer">Book a Session</a>
            <a href="mailto:${email}">Email Tiffany</a>
            <a href="/work-with-me/">Work With Me</a>
          </div>
        </div>
      </div>
      <div class="tes-global-footer-meta">
        <span>The Embodied Self</span>
        <span>Virtual therapy in PA & NJ</span>
      </div>
    </div>
  `;

  document.body.appendChild(footer);
})();
