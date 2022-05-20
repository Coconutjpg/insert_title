import {render,screen,cleanup} from '@testing-library/react';
import '@testing-library/jest-dom'
import App from './App.js'

test('should render App component',()=>{
	render(<App/>);
	const AppElement = screen.getByTestId('app-1');
	expect(AppElement).toBeInTheDocument();
})







