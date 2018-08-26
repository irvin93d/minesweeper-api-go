import React from 'react'
import Minecell from './Minecell'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

function setup(props = {}) {
  const enzymeWrapper = mount(<Minecell {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

const shallowWrapper = shallow(<Minecell />)

describe('Minecell component', () => {

  it('renders without crashing', () => {
    expect(shallowWrapper).toHaveLength(1)
  })

  it('renders with Minecell class', () => {
    expect(shallowWrapper.find('div').hasClass('Minecell')).toBe(true)
  })
})
