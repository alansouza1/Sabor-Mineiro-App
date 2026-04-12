import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Login } from '../Login';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../hooks/useAuth';

// Mock the AuthContext login function
const mockLogin = vi.fn();

vi.mock('../../hooks/useAuth', async (importOriginal) => {
  const actual: any = await importOriginal();
  return {
    ...actual,
    useAuth: () => ({
      login: mockLogin,
      user: null,
      isLoading: false,
    }),
  };
});

const renderLogin = () => {
  return render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
};

describe('Login Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render login form', () => {
    renderLogin();
    expect(screen.getByText(/Acesso Restrito/i)).toBeDefined();
    expect(screen.getByPlaceholderText(/email@exemplo.com/i)).toBeDefined();
  });

  it('should handle demo access click', async () => {
    renderLogin();
    const demoButton = screen.getByText(/Acessar como Demo/i);
    
    fireEvent.click(demoButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('demo@sabormineiro.com', expect.any(String));
    });
  });

  it('should show error message on failed login', async () => {
    mockLogin.mockRejectedValueOnce({
      response: { status: 401 }
    });

    renderLogin();
    const emailInput = screen.getByPlaceholderText(/email@exemplo.com/i);
    const passwordInput = screen.getByPlaceholderText(/••••••••/i);
    const submitButton = screen.getByRole('button', { name: /Entrar/i });

    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Email ou senha incorretos/i)).toBeDefined();
    });
  });
});
