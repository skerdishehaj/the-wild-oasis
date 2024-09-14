import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ui/ErrorFallback.jsx';
/**
 * ErrorBoundary catches errors while React is rendering.
 * So bugs that occur in some event handler or async functions or in an effect will not be caught.
 */

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.replace('/')}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
