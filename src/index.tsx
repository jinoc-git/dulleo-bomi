import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GlobalStyles from './globalStyle/GlobalStyle';
<<<<<<< HEAD

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const queryClient = new QueryClient();

=======

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient()

>>>>>>> 259dd95a2cb0f51f69fefcceb8129c08f1e39922
root.render(
  <QueryClientProvider client={queryClient}>
    <GlobalStyles />
    <App />
<<<<<<< HEAD
  </QueryClientProvider>,
=======
  </QueryClientProvider>
>>>>>>> 259dd95a2cb0f51f69fefcceb8129c08f1e39922
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
