import { isExist } from '../util'
import { inputDataSet } from './dataset'

export default function () {
  describe('전체 리뷰 조회 페이지', () => {
    describe('존재 여부', () => {
      before(() => {
        cy.visit('/')
      })

      it('네비게이션 존재 여부', () => {
        cy.get('#home').should('have.attr', 'href', '/community/')
        cy.get('#create').should('have.attr', 'href', '/community/create/')
      })

      isExist('타이틀 링크', '.title')
    })

    describe('기능 테스트', () => {
      it('메인 페이지의 타이틀과 디테일 페이지의 타이틀이 같은가요?', () => {
        cy.visit('/')
        cy.get('.title')
          .first()
          .invoke('text')
          .then((title) => {
            cy.get('.title').first().click()
            cy.get('#title').should('have.text', title)
          })
      })
      it('create 테스트에서 작성한 타이틀이 리스트에 있나요?', () => {
        cy.visit('/')
        cy.get('.title').contains(inputDataSet[0].data)
      })
    })
  })
}
