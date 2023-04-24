import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import App from './App';
import Loading from './components/Loading';

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();

root.render(
	<RecoilRoot>
		<Suspense fallback={<Loading />}>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<MantineProvider>
						<NotificationsProvider position="top-center">
							<App />
						</NotificationsProvider>
					</MantineProvider>
				</BrowserRouter>
			</QueryClientProvider>
		</Suspense>
	</RecoilRoot>,
);
