import React from "react";
import {mount} from "enzyme";
import configureMockStore from "redux-mock-store";
import '../../test-config';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import QuizForm from "../../components/Form/Quiz/QuizForm";
const mockStore = configureMockStore([thunk]);
import multipleChoicePic from "../../img/multipleChoice.png";
import wordPic from "../../img/word.png";
import MultipleChoiceQuizForm from "../../components/Form/Quiz/MultipleChoiceQuizForm";

describe("QuizForm component", () =>{
    let component;
    let store;
    let initialState;
    let mockClosePopup = jest.fn()
    beforeEach(() =>{
        initialState={
            selectedLecture:{
                lectureId:"1"
            }
        }
        store = mockStore(initialState);
        component = mount(<Provider store={store}><QuizForm/></Provider>)
    })
    afterEach(() =>{
        jest.clearAllMocks();
    })
    it("matches snapshot", () =>{
        expect(component.html()).toMatchSnapshot()
    })
    it("changes picture on hover", () => {
        let image = component.find("img")
        expect(image.prop("src")).toEqual(multipleChoicePic)

        let multipleChoiceButton = component.find("#multiple-choice").at(0)
        let wordButton = component.find("#word").at(0)
        let numericButton = component.find("#numeric").at(0)
        wordButton.simulate("mouseEnter")
        expect(component.find("img").prop("src")).toEqual(wordPic)
        multipleChoiceButton.simulate("mouseEnter")
        expect(component.find("img").prop("src")).toEqual(multipleChoicePic)
        numericButton.simulate("mouseEnter")
        expect(component.find("img").prop("src")).toEqual(multipleChoicePic)
    })
    it("renders correct type of form", () =>{
        expect(component.find(MultipleChoiceQuizForm)).toHaveLength(0)
        let multipleChoiceButton = component.find("#multiple-choice").at(0)
        multipleChoiceButton.simulate("click")
        expect(component.find(MultipleChoiceQuizForm)).toHaveLength(1)
    })
})