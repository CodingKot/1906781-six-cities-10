import {Link} from 'react-router-dom';
import Header from '../../components/header/header';

function NotFoundPage(): JSX.Element {
  return (
    <div className = "page">
      <Header/>
      <section style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
      >
        <h1>404. Page not found</h1>
        <Link to="/" style={{
          color: 'red',
        }}
        >Go back to main page
        </Link>
      </section>
    </div>
  );
}

export default NotFoundPage;
