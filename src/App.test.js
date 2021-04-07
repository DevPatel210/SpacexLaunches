import { screen } from '@testing-library/react';
import App from './App';
import { render } from '@testing-library/react';
import Enzyme, { mount } from 'enzyme';

// Add your adapter version below
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
