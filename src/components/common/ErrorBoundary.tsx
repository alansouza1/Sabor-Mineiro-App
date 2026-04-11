import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

const ErrorFallback = () => (
  <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-gray-50">
    <h1 className="text-2xl font-bold text-gray-900 mb-4">Algo deu errado.</h1>
    <p className="text-gray-600 mb-8">Ocorreu um erro inesperado na aplicação.</p>
    <button
      className="bg-mineiro-brown text-white px-8 py-3 rounded-2xl font-bold"
      onClick={() => window.location.reload()}
    >
      Recarregar Página
    </button>
  </div>
);

export const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  );
};
