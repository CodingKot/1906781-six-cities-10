import {render, screen} from '@testing-library/react';
import LoadingErrorScreen from './loading-error-screen';

describe('Component: LoadingErrorScreen', () => {
  it('should render correctly', () => {

    render(
      <LoadingErrorScreen/>
    );

    const headingElement = screen.getByText('Sorry, this page is not awailable now');


    expect(headingElement).toBeInTheDocument();

  });
});
