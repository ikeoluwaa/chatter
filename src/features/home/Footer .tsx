export default function Footer() {
  return (
    <footer>
      <div className="footer-nav">
        <div>
          <h1 style={{ color: "#543EE0" }}>Chatter</h1>
        </div>
        <div className="footer-details">
          <div className="nav-col">
            <p>Explore</p>
            <ul className="footer-nav-list">
              <li>community</li>

              <li>Trending blogs</li>

              <li>Chatter for teams</li>
            </ul>
          </div>
          <div className="nav-col">
            <p>Support</p>
            <ul className="footer-nav-list">
              <li>Support docs</li>
              <li>Join slack</li>
              <li>Contact</li>
            </ul>
          </div>

          <div className="nav-col">
            <p>Official blog</p>
            <ul className="footer-nav-list">
              <li>Chatter for teams</li>
              <li> Engineering blog</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
