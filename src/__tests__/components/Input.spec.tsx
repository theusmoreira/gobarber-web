import React from 'react';

import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Input from '../../components/Input';
import '@testing-library/jest-dom/extend-expect';

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'email',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      };
    },
  };
});

describe('Input component', () => {
  it('should be able to render an input ', () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    expect(getByPlaceholderText('E-mail')).toBeTruthy();
  });

  it('should render hightlight on input focus', async () => {
    render(
      <Input name="email" placeholder="E-mail" />,
    );

    const inputElement = screen.getByPlaceholderText('E-mail');
    const containerElement = screen.getByTestId('input-container');

    fireEvent.focus(inputElement);

    await waitFor(() => {
      expect(containerElement).toHaveStyle({
        borderColor: '#ff9000',
      });
    });

    fireEvent.blur(inputElement);

    await waitFor(() => {
      expect(containerElement).not.toHaveStyle('border-color: #ff9000;');
      expect(containerElement).not.toHaveStyle('color: #ff9000;');
    });
  });

  it('should keep input border hightlight when input filled', async () => {
    render(
      <Input name="email" placeholder="E-mail" />,
    );

    const inputElement = screen.getByPlaceholderText('E-mail');
    const containerElement = screen.getByTestId('input-container');

    fireEvent.change(inputElement, {
      target: { value: 'johndoe@example.com.br' }
    })

    fireEvent.blur(inputElement);

    await waitFor(() => {
      expect(containerElement).toHaveStyle('color: #ff9000;');
    });
  });
});
