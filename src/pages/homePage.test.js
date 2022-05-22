import {render,screen,cleanup} from '@testing-library/react';
import '@testing-library/jest-dom'
import HomePage from './homePage.jsx'


test('should render App component',()=>{
	render(<HomePage/>);
	const AppElement = screen.getByTestId('page-1');
	expect(AppElement).toBeInTheDocument();
})
