import React from 'react'

import { ConnectedMinecell } from './Minecell'
import { createMockStore } from 'redux-test-utils'
import { shallowWithStore } from 'enzyme-redux'
import { openCell } from './actions'

describe('Minecell component', () => {
  const singleMineTests = [
    {
      description: 'renders without exploding',
      mine: { isOpen: false },
      classes: [],
      notClasses: []
    },
    {
      description: 'renders correct classes on closed',
      mine: { isOpen: false },
      classes: ['Minecell', 'Minecell-closed'],
      notClasses: ['Minecell-open']
    },
    {
      description: 'renders correct classes on closed',
      mine: { isOpen: true },
      classes: ['Minecell', 'Minecell-open'],
      notClasses: ['Minecell-closed']
    },
  ]
  for (const test of singleMineTests) {
    it(test.description, () => {
      const mockstate = {
        minefield: {
          mines: [[test.mine]],
          cols: 1,
          rows: 1,
        }
      }
      const cell = { row: 0, col: 0 }
      const store = createMockStore(mockstate)
      const component = shallowWithStore(
        <ConnectedMinecell {...{cell}} />, store
      )
      const div = component.dive().find('div')
      expect(div).toHaveLength(1)
      for (const cls of test.classes) {
        expect(div.hasClass(cls)).toBe(true)
      }
      for (const cls of test.notClasses) {
        expect(div.hasClass(cls)).toBe(false)
      }
    })
  }


  it('dispatches open() correctly when cell is closed', () => {
    const mockstate = {
      minefield: {
        mines: [
          [{ isOpen: false },{ isOpen: false }],
          [{ isOpen: false },{ isOpen: false }]
        ],
        cols: 2,
        rows: 2,
      }
    }

    const cells = [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 1, col: 0 },
      { row: 1, col: 1 }
    ]

    const store = createMockStore(mockstate)

    const pairs = cells.map((cell) => {
      const component = shallowWithStore(
        <ConnectedMinecell {...{cell}} />, store
      )
      return { cell, component }
    })

    for (const {cell, component} of pairs) {
      expect(store.isActionDispatched(openCell(cell))).toBe(false)
      component.props().open()
      expect(store.isActionDispatched(openCell(cell))).toBe(true)
    }
  })

})
