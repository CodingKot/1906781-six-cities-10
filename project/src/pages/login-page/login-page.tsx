import Header from '../../components/header/header';
import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import {getIsUserAuthorized} from '../../store/selectors';
import {AppRoute} from '../../const';
import LoginSection from '../../components/login-section/login-section';

function LoginPage(): JSX.Element {
  const isUserAuthorized = useAppSelector(getIsUserAuthorized);

  if(isUserAuthorized) {
    return (
      <Navigate to={AppRoute.Main}/>
    );
  }

  return (
    <div className="page page--gray page--login">
      <Header/>
      <LoginSection/>
    </div>
  );
}

export default LoginPage;
