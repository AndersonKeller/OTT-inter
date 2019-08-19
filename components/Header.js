import Link from 'next/link';

const styles = {
  container: {
  },
  menu: {
    listStyle: 'none',
  }
}
const linkStyle = {
  marginRight: 15
};

const Header = () => (

  <div style={styles.container}>
    
    {/* logo */}
    <Link href="/">
      <a>Dale Campeón</a>
    </Link>
    
    {/* menu */}
    <ul style={styles.menu}>
      <li>
        <Link href="/">
          <a style={linkStyle}>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/videos">
          <a style={linkStyle}>Videos</a>
        </Link>
      </li>
      <li>
        <Link href="/podcasts">
          <a style={linkStyle}>Podcasts</a>
        </Link>
      </li>
      <li>
        <Link href="/entrevistas">
          <a style={linkStyle}>Entrevistas</a>
        </Link>
      </li>
      <li>
        <Link href="/fotos">
          <a style={linkStyle}>Fotos</a>
        </Link>
      </li>
      <li>
        <Link href="/Sorteos">
          <a style={linkStyle}>Sorteos</a>
        </Link>
      </li>
    </ul>

    {/* form */}
    <form>
      <input placeholder="Buscar" type="search" />
    </form>
    
    <style jsx>{`
      li {
        display: inline;
      }
    `}</style>
  </div>
  
);

export default Header;
