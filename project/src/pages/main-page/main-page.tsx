import Header from '../../components/header/header';
import HeaderNav from '../../components/header-nav/header-nav';
import {Cities} from '../../types/offer';
import MainSection from '../../components/main-section/main-section';

type MainPageProps = {
  cities: Cities;
}

function MainPage({cities}: MainPageProps): JSX.Element {

  return (
    <div className="page page--gray page--main">
      <Header>
        <HeaderNav/>
      </Header>
      <MainSection cities={cities}/>
    </div>
  );
}

export default MainPage;
