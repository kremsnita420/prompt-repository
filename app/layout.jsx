import '@styles/globals.css';

import Nav from '@components/Nav';
import Provider from '@components/Provider';

export const metadata = {
	title: 'Promptopia',
	description: 'Discover and share AI prompts',
	icons: {
		icon: {
			url: '/favicon.svg',
			type: 'image/svg',
		},
	},
};

const RootLayout = ({ children }) => {
	return (
		<html>
			<body suppressHydrationWarning={true}>
				<Provider>
					<div className='main'>
						<div className='gradient' />
					</div>
					<main className='app'>
						<Nav />
						{children}
					</main>
				</Provider>
			</body>
		</html>
	);
};
export default RootLayout;
