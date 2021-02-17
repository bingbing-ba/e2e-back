import {
  typeInputForm,
  selectRadioForm,
  typeTextareaForm,
  isExist,
} from "./util";

const selectors = {
  inputTitle: 'input[name="title"]',
  inputRank: 'input[name="rank"]',
  textareaContent: 'textarea[name="content"]',
  submitBtn: "#submit-btn",
  backBtn: "#back-btn",
};



const inputDataSet = [
  {
    selector: selectors.inputTitle,
    data: "리뷰 제목 테스트",
  },
];
const radioInputDataSet = [
  {
    selector: selectors.inputRank,
    data: '3',
  },
];
const textareaDataSet = [
  {
    selector: selectors.textareaContent,
    data: 
    `이건 내용인데, 개행문자가 그대로 출력되는지를
    확인해 보기 위한 과정인데, 아마 자동 인덴팅이 있어서 
    좀 그래보이네...
    `,
  },
];
describe("데이터 생성, CREATE", function () {
  function inputAlldata() {
    typeInputForm(inputDataSet);
    selectRadioForm(radioInputDataSet);
    typeTextareaForm(textareaDataSet);
  }
  describe("존재 여부", () => {
    before(() => {
      cy.visit("/create");
    });
    
    it("네비게이션 존재 여부", () => {
      cy.get("#home").should("have.attr", "href", "/community/");
      cy.get("#create").should("have.attr", "href", "/community/create/");
    });
    isExist("title input", selectors.inputTitle);
    isExist("content textarea", selectors.textareaContent);
    isExist("rank radio input", selectors.inputRank);
    isExist("submit button", selectors.submitBtn);
    isExist("back button", selectors.backBtn);
  });

  describe("입력 조건 테스트", () => {
    beforeEach(() => {
      cy.visit("/create");
    });
    it("title 미 입력", () => {
      inputAlldata();
      cy.get(selectors.inputTitle).clear();
      cy.get(selectors.submitBtn)
        .click()
        .focused()
        .should("have.attr", "name", "title");
    });
    it("rank 미 입력", () => {
      inputAlldata();
      // radio button uncheck
      cy.get(`${selectors.inputRank}[value="3"]`).then(($el)=>$el.prop('checked',false))
      cy.get(selectors.submitBtn).click().url().should("include", "/create/");
    });
    it("content 미 입력", () => {
      inputAlldata();
      cy.get(selectors.textareaContent).clear();
      cy.get("#submit-btn")
        .click()
        .focused()
        .should("have.attr", "name", "content");
    });
    it("100자 이상의 title 입력", () => {
      const over100Title =
        "over100Titleover100Titleover100Titleover100Titleover100Titleover100Titleover100Titleover100Titleover100Titleover100Titleover100Titleover100Titleover100Title";
      cy.get(selectors.inputTitle).type(over100Title).should('have.value',over100Title.slice(0,100));
    });
  });
  it('입력 후 디테일 페이지 이동 테스트',()=>{
    cy.visit('/create')
    inputAlldata()
    cy.get("#submit-btn").click()
    cy.get('#title').should('have.text',inputDataSet[0].data)
    cy.get('#content').should('have.text',textareaDataSet[0].data.trim())
    cy.get('#rank').should('have.text',radioInputDataSet[0].data)
  })
});

describe('전체 리뷰 조회 페이지',()=>{
  describe('존재 여부',()=>{
    before(() => {
      cy.visit("/");
    });
    
    it("네비게이션 존재 여부", () => {
      cy.get("#home").should("have.attr", "href", "/community/");
      cy.get("#create").should("have.attr", "href", "/community/create/");
    });

    isExist('타이틀 링크', '.title')
  })
  
  describe('기능 테스트',()=>{
    it('메인 페이지의 타이틀과 디테일 페이지의 타이틀이 같은가요?',()=>{
      cy.visit('/')
      cy.get('.title').first().invoke('text').then(title=>{
        cy.get('.title').first().click()
        cy.get('#title').should('have.text',title)
      })
    })
    it('create 테스트에서 작성한 타이틀이 리스트에 있나요?',()=>{
      cy.visit('/')
      cy.get('.title').contains(inputDataSet[0].data)
    })
  })
})

describe('디테일 페이지',()=>{
  describe('존재 여부',()=>{
    before(() => {
      cy.visit("/1");
    });
    
    it("네비게이션 존재 여부", () => {
      cy.get("#home").should("have.attr", "href", "/community/");
      cy.get("#create").should("have.attr", "href", "/community/create/");
    });

    isExist('타이틀','#title')
    isExist('랭크','#rank')
    isExist('컨텐트','#content')
  })
  describe('404 test',()=>{
    it('1000번 째 글로 접속해서 404 check',()=>{
      cy.request({url:'/1000',failOnStatusCode:false}).then(res=>{
        expect(res.status).to.eq(404)
      })
    })
  })
})