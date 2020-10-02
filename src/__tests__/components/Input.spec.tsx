import React from 'react';

import { render } from '@testing-library/react';
import Input from '../../components/Input';

describe('Input component', () => {
  it('should be able to render an input ', () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    expect(getByPlaceholderText('E-mail')).toBeTruthy();
  });
  1;
});
