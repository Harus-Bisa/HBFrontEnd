import React from "react";
import {mount} from "enzyme";
import configureMockStore from "redux-mock-store";
import '../../test-config';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
const mockStore = configureMockStore([thunk]);
import MultipleChoiceQuizForm from "../../components/Form/Quiz/MultipleChoiceQuizForm";
import {Form} from "reactstrap";
import AnswerForm from "../../components/Form/Quiz/AnswerForm";

describe("MultipleChoiceQuizForm component", () =>{
    let initialState;
    let store;
    let component;
    beforeEach(() =>{
        jest.clearAllMocks()
        initialState= {
            selectedLecture:{
                lectureId: "1",
                quizzes:[
                    {
                      "question": "1 + 1 = ?",
                      "answerOptions": [
                        "4",
                        "2",
                        "0"
                      ],
                      "correctAnswerIndex": 0,
                      "duration": 0,
                      "started": true,
                      "pointWorth": 10,
                      "includeForGrading": true,
                      "participants": 27
                    }
                  ]
            }
        }
    })
    it("renders edit type form", () =>{
        store = mockStore(initialState);
        component = mount(<Provider store={store}><MultipleChoiceQuizForm id={0}/></Provider>)
        var header = component.find("h3")
        expect(header.text()).toBe("Edit Pertanyaan")
    })
    it("renders add type form", () =>{
        store = mockStore(initialState);
        component = mount(<Provider store={store}><MultipleChoiceQuizForm/></Provider>)
        var header = component.find("h3")
        expect(header.text()).toBe("Tambah Pertanyaan")
    })
    it("changes state when form is inputted", () =>{
        let setState = jest.fn();
        let useStateSpy = jest.spyOn(React, 'useState');
        useStateSpy.mockImplementation((init) => [init, setState])
        store = mockStore(initialState);
        component = mount(<Provider store={store}><MultipleChoiceQuizForm/></Provider>)
        store.dispatch = jest.fn()

        jest.clearAllMocks()
        var labels = ["question", "point", "duration"]
        labels.forEach(l =>{
            var input = component.find("#"+l).at(0)
            expect(setState).not.toHaveBeenCalled()
            input.simulate("change")
            expect(setState).toHaveBeenCalledTimes(1)
            jest.clearAllMocks()

        })
    })
    it("adds answer choices", async () =>{
        let setState = jest.fn();
        let useStateSpy = jest.spyOn(React, 'useState');
        useStateSpy.mockImplementation((init) => [init, setState])
        store = mockStore(initialState);
        component = mount(<Provider store={store}><MultipleChoiceQuizForm/></Provider>)

        jest.clearAllMocks()
        expect(component.find(AnswerForm)).toHaveLength(2)
        var input = component.find("#add-answer-button").at(0)
        expect(setState).not.toHaveBeenCalled()
        input.simulate("click")
        expect(setState).toHaveBeenCalledTimes(1)
        
    })
    xit("submits edit", () =>{
        store = mockStore(initialState);
        store.dispatch = jest.fn()
        const mockPreventDefault = jest.fn();
        component = mount(<Provider store={store}><MultipleChoiceQuizForm id={0}/></Provider>)

        expect(store.dispatch).not.toHaveBeenCalled()
        expect(mockPreventDefault).not.toHaveBeenCalled()
        expect(mockClosePopup).not.toHaveBeenCalled()

        var submitButton = component.find(Button)
        expect(submitButton.text()).toBe("Edit")
        component.find(Form).simulate("submit", {preventDefault:mockPreventDefault})
        expect(store.dispatch).toHaveBeenCalled()
        expect(mockPreventDefault).toHaveBeenCalled()
        expect(mockClosePopup).toHaveBeenCalled()
    })
    it("submits add", () =>{
        store = mockStore(initialState);
        store.dispatch = jest.fn()
        const mockPreventDefault = jest.fn();
        component = mount(<Provider store={store}><MultipleChoiceQuizForm/></Provider>)

        expect(store.dispatch).not.toHaveBeenCalled()
        expect(mockPreventDefault).not.toHaveBeenCalled()
        
        var labels = ["question", "point", "duration", "answer-input-0", "answer-input-1", "switch-0"]
        labels.forEach(l =>{
            var input = component.find("#"+l).at(0)
            input.simulate("change", {target:{value:"Calcu"}})
            component.update()
        })
        var submitButton = component.find("#submit-button").at(0)
        expect(submitButton.text()).toBe("Tambahkan")
        component.find(Form).simulate("submit", {preventDefault:mockPreventDefault})
        expect(store.dispatch).toHaveBeenCalled()
        expect(mockPreventDefault).toHaveBeenCalled()
        component.update()
    })
})