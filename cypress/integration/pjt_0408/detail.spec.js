import { isExist } from '../util'

export default function () {
  describe('디테일 페이지', () => {
    describe('존재 여부', () => {
      before(() => {
        cy.visit('/1')
      })

      it('네비게이션 존재 여부', () => {
        cy.get('#home').should('have.attr', 'href', '/community/')
        cy.get('#create').should('have.attr', 'href', '/community/create/')
      })

      isExist('타이틀', '#title')
      isExist('랭크', '#rank')
      isExist('컨텐트', '#content')
    })
    describe('404 test', () => {
      it('1000번 째 글로 접속해서 404 check', () => {
        cy.request({ url: '/1000', failOnStatusCode: false }).then((res) => {
          expect(res.status).to.eq(404)
        })
      })
    })
  })
}
