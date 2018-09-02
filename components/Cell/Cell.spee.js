import React from 'react';
import { createMockStore } from 'redux-test-utils';
import { shallowWithStore } from 'enzyme-redux';
import { CLOSED, MINE, CONTENTS, STATES, OPEN, FLAGGED, ConnectedCell, UNKNOWN } from './Cell';
import { openCell, toggleFlagOnCell } from '../../actions';


it('dispatches correctly on click', () => {
  const cell = { row: 0, col: 0 };
  const mockstate = {
    minefield: {
      mines: [{ state: CLOSED, content: MINE }],
      cols: 1,
    }
  };
  const store = createMockStore(mockstate);

  const component = shallowWithStore(<ConnectedCell cell={cell} />, store);

  expect(store.isActionDispatched(openCell(cell))).toBe(false);
  component.props().leftClick();
  expect(store.isActionDispatched(openCell(cell))).toBe(true);
  expect(store.isActionDispatched(toggleFlagOnCell(cell))).toBe(false);
  component.props().rightClick();
  expect(store.isActionDispatched(toggleFlagOnCell(cell))).toBe(true);
});

it('has correct class', () => {
  for (const content of CONTENTS) {
    for (const state of STATES) {
      const mockstate = {
        minefield: {
          mines: [{ state, content }],
          cols: 1,
        }
      };
      const store = createMockStore(mockstate);
      const cell = { row: 0, col: 0 };
      const component = shallowWithStore(<ConnectedCell cell={cell} />, store);
      let expectedClasses = ['cell', state];
      if (!isNaN(content)) {
        expectedClasses.push(`surrounding${content}`);
      } else {
        expectedClasses.push(content || UNKNOWN);
      }
      expectedClasses = expectedClasses.map(s => s.toLowerCase()).sort().join(' ');
      let actualClasses = component.dive().prop('className').split(' ').sort().join(' ');
      expect(actualClasses).toEqual(expectedClasses);
    }
  }
});
