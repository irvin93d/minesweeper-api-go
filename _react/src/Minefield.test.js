import React from 'react'

import ConnectedMinefield from './Minefield'
import { createMockStore } from 'redux-test-utils'
import { shallowWithStore, mountWithStore } from 'enzyme-redux'
import { mockMinefield } from './minefield.mock'

const mockStore = createMockStore({minefield: mockMinefield})

describe('Minefield component', () => {

  it('renders without exploding', () => {
    const component = shallowWithStore(
      <ConnectedMinefield />, mockStore
    )
    const div = component.dive().find('div')
    expect(div).toHaveLength(1)
    expect(div.hasClass('Minefield')).toBe(true)
  })

  it('renders right number of mines', () => {
    const component = mountWithStore(
      <ConnectedMinefield />, mockStore
    )
    /*
    const div = component.dive().find('div')
    expect(div).toHaveLength(1)
    expect(div.hasClass('Minefield')).toBe(true)
    //expect(mountWrapper.find('.Minecell')).toHaveLength(80)
    */
  })

})
