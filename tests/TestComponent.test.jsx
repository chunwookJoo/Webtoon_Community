import { render, screen } from '@testing-library/react';

import TestComponent from '../src/TestComponent';

test('renders component correctly', () => {
	render(<TestComponent />);
	const element = screen.getByText('TestComponent');
	expect(element).toBeInTheDocument();
});
