type PostProps = {
  title: string;
  author: string;
  date: string;
};

const Post = ({ title, author, date }: PostProps) => (
  <article class="post">
    <header>
      <div class="title">
        <h2>
          <a href="single.html">{title}</a>
        </h2>
        <p>Learn about {title.toLowerCase()} and more!</p>
      </div>
      <div class="meta">
        <time class="published" datetime={date}>{date}</time>
        <a href="#" class="author">
          <span class="name">{author}</span>
          <img src="images/avatar.jpg" alt="" />
        </a>
      </div>
    </header>
    <a href="single.html" class="image featured">
      <img src="images/pic01.jpg" alt="" />
    </a>
    <p>Learn about {title} in detail in this lesson.</p>
    <footer>
      <ul class="actions">
        <li>
          <a href="single.html" class="button large">Take a lesson</a>
        </li>
      </ul>
      <ul class="stats">
        <li>
          <a href="#">Python</a>
        </li>
        <li>
          <a href="#" class="icon solid fa-heart">28</a>
        </li>
        <li>
          <a href="#" class="icon solid fa-comment">128</a>
        </li>
      </ul>
    </footer>
  </article>
);

export default Post;
