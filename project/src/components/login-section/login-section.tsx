import {Link, generatePath} from 'react-router-dom';
import {useRef, FormEvent} from 'react';
import {useAppDispatch} from '../../hooks';
import {AuthData} from '../../types/auth-data';
import {login} from '../../store/api-actions';
import {getRandomCity} from '../../utils/utils';
import {CITIES, AppRoute} from '../../const';
import {changeCity} from '../../store/action';

function LoginSection(): JSX.Element {

  const dispatch = useAppDispatch();
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = (authData: AuthData) => {
    dispatch(login(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if(loginRef.current !== null && passwordRef.current !== null) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  const city = getRandomCity(CITIES);

  return (
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form className="login__form form" action="" method="post" onSubmit={handleSubmit}>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input className="login__input form__input" type="email" name="email" placeholder="Email" ref={loginRef} required/>
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input className="login__input form__input" type="password" name="password" placeholder="Password" ref={passwordRef} required pattern='\d{1,}\w{1,}'/>
            </div>
            <button className="login__submit form__submit button" type="submit">Sign in</button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <Link className="locations__item-link" to={generatePath(AppRoute.Main, {id: city.name})} onClick={() => {
              dispatch(changeCity(city));
            }}
            >
              <span>{city.name}</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default LoginSection;
