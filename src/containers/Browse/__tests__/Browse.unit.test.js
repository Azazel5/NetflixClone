import React from 'react'
import {shallow} from 'enzyme'
import Browse from '../Browse'
import BrowseContent from '../BrowseContent/BrowseContent'

describe("<Browse />", () => {
    it("renders exactly 1 <BrowseContent /> regardless of the route prop", () => {
        const wrapper = shallow(<Browse />)
        wrapper.setProps({route: '/browse'})
        expect(wrapper.find(BrowseContent)).to.have.lengthOf(1)
    })
})