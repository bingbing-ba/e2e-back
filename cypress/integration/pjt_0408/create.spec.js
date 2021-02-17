import {
  inputDataSet,
  radioInputDataSet,
  textareaDataSet,
  selectors,
} from './dataset'
import {
  isExist,
  typeInputForm,
  typeTextareaForm,
  selectRadioForm,
} from '../util'
export default function () {
  describe('데이터 생성, CREATE', function () {
    function inputAlldata() {
      typeInputForm(inputDataSet)
      selectRadioForm(radioInputDataSet)
      typeTextareaForm(textareaDataSet)
    }
    describe('존재 여부', () => {
      before(() => {
        cy.visit('/create')
      })

      it('네비게이션 존재 여부', () => {
        cy.get('#home').should('have.attr', 'href', '/community/')
        cy.get('#create').should('have.attr', 'href', '/community/create/')
      })
      isExist('title input', selectors.inputTitle)
      isExist('content textarea', selectors.textareaContent)
      isExist('rank radio input', selectors.inputRank)
      isExist('submit button', selectors.submitBtn)
      isExist('back button', selectors.backBtn)
    })

    describe('입력 조건 테스트', () => {
      beforeEach(() => {
        cy.visit('/create')
      })
      it('title 미 입력', () => {
        inputAlldata()
        cy.get(selectors.inputTitle).clear()
        cy.get(selectors.submitBtn)
          .click()
          .focused()
          .should('have.attr', 'name', 'title')
      })
      it('rank 미 입력', () => {
        inputAlldata()
        // radio button uncheck
        cy.get(`${selectors.inputRank}[value="3"]`).then(($el) =>
          $el.prop('checked', false)
        )
        cy.get(selectors.submitBtn).click().url().should('include', '/create/')
      })
      it('content 미 입력', () => {
        inputAlldata()
        cy.get(selectors.textareaContent).clear()
        cy.get('#submit-btn')
          .click()
          .focused()
          .should('have.attr', 'name', 'content')
      })
      it('100자 이상의 title 입력', () => {
        const over100Title =
          'over100Titleover100Titleover100Titleover100Titleover100Titleover100Titleover100Titleover100Titleover100Titleover100Titleover100Titleover100Titleover100Title'
        cy.get(selectors.inputTitle)
          .type(over100Title)
          .should('have.value', over100Title.slice(0, 100))
      })
    })
    it('입력 후 디테일 페이지 이동 테스트', () => {
      cy.visit('/create')
      inputAlldata()
      cy.get('#submit-btn').click()
      cy.get('#title').should('have.text', inputDataSet[0].data)
      cy.get('#content').should('have.text', textareaDataSet[0].data.trim())
      cy.get('#rank').should('have.text', radioInputDataSet[0].data)
    })
  })
}
