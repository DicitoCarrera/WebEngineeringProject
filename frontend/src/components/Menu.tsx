const Menu = () => (
  <section id="menu">
    <section>
      <form class="search">
        <input type="text" name="query" placeholder="Search" />
      </form>
    </section>
    <section>
      <ul class="links">
        <li>
          <a href="#">My Account</a>
        </li>
        <li>
          <a href="#">Learning Progress</a>
        </li>
        <li>
          <a href="#">Resources</a>
        </li>
      </ul>
    </section>
    <section>
      <ul class="actions stacked">
        <li>
          <a href="#" class="button large fit">Log In</a>
        </li>
      </ul>
    </section>
  </section>
);

export default Menu;
