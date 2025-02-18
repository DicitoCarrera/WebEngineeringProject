const Sidebar = () => (
  <section id="sidebar">
    <section id="intro">
      <a href="#" class="logo">
        <img src="images/logo.jpg" alt="" />
      </a>
      <header>
        <h2>Learn Programming</h2>
        <p>Master Coding with Us!</p>
      </header>
    </section>
    <section>
      <div class="mini-posts">
        <article class="mini-post">
          <header>
            <h3>
              <a href="single.html">Python Made Easy</a>
            </h3>
            <time class="published" datetime="2015-10-20">
              February 12, 2025
            </time>
          </header>
          <a href="single.html" class="image">
            <img src="images/pic04.jpg" alt="" />
          </a>
        </article>
        {/* More mini-posts here */}
      </div>
    </section>
  </section>
);

export default Sidebar;
