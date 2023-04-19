import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <nav style={{ backgroundColor: 'black', padding: '10px 20px' }}>
        <Link href="/">
          <span style={{ fontFamily: 'Montserrat', color: 'white', fontWeight: 'bold', fontSize: '24px', textDecoration: 'none' }}>Processo Oper</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;