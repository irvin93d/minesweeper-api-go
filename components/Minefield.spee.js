
import React from 'react';
import { createMockStore } from 'redux-test-utils';
import { shallowWithStore } from 'enzyme-redux';
import { ConnectedMinefield } from './Minefield';
import { CLOSED, MINE } from './Cell/Cell';
import { mockstate } from './mockstate';

it('renders without crashing', () => {
  const store = createMockStore(mockstate);

  const component = shallowWithStore(<ConnectedMinefield />, store);
});
