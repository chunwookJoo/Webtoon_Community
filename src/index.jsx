import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import App from './App';
import Loading from './components/Loading';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<RecoilRoot>
		<Suspense fallback={<Loading />}>
			<BrowserRouter>
				<MantineProvider>
					<NotificationsProvider position="top-center">
						<App />
					</NotificationsProvider>
				</MantineProvider>
			</BrowserRouter>
		</Suspense>
	</RecoilRoot>,
);
