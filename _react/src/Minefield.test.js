import React from 'react'
import Minefield from './Minefield'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

function setup(props = {}) {
  const enzymeWrapper = mount(<Minefield {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

const shallowWrapper = shallow(<Minefield />)

describe('Minefield component', () => {

  it('renders without exploding', () => {
    expect(shallowWrapper).toHaveLength(1)
  })

  it('renders Minefield class', () => {
    expect(shallowWrapper.find('div').hasClass('Minefield')).toBe(true)
  })
})
