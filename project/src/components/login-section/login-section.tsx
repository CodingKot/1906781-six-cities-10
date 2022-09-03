import {Link, generatePath} from 'react-router-dom';
import {useRef, FormEvent} from 'react';
import {useAppDispatch} from '../../hooks';
import {login} from '../../store/api-actions';
import {getRandomCity} from '../../utils/utils';
import {CITIES, AppRoute} from '../../const';
import {changeCity} from '../../store/offers-process/offers-process';
import {toast} from 'react-toastify';

function LoginSection(): JSX.Element {

  const dispatch = useAppDispatch();
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const validatePasswordForSymbols = (password: string): boolean => /\d/.test(password) && /[a-zA-Z]/.test(password);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if(loginRef.current !== null && passwordRef.current !== null) {
      validatePasswordForSymbols(passwordRef.current.value)
        ?
        dispatch(login({
          login: loginRef.current.value,
          password: passwordRef.current.value,
        }))
        :
        toast.warn('Password shold contain at least one letter and one number', {
          position: toast.POSITION.TOP_CENTER
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
              <input className="login__input form__input" type="password" name="password" placeholder="Password" ref={passwordRef} required/>
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
