import Link from 'next/link';

const styles = {
  container: {
  },
}
const linkStyle = {
  marginRight: 15
};

const Header = () => (
  <div style={styles.container}>
    <Link href="/">
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href="/about">
      <a style={linkStyle}>About</a>
    </Link>
  </div>
);

export default Header;
