import {
  typeInputForm,
  selectRadioForm,
  typeTextareaForm,
} from "./typeFormBundle";

const selectors = {
  inputTitle: 'input[name="title"]',
  inputRank: 'input[name="rank"]',
  textareaContent: 'textarea[name="content"]',
  submitBtn: "#submit-btn",
  backBtn: "#back-btn",
};

describe("데이터 생성, CREATE", function () {
  const inputDataSet = [
    {
      selector: selectors.inputTitle,
      data: "리뷰 제목 테스트",
    },
  ];
  const radioInputDataSet = [
    {
      selector: selectors.inputRank,
      data: 3,
    },
  ];
  const textareaDataSet = [
    {
      selector: selectors.textareaContent,
      data: `이건 내용인데, 개행문자가 그대로 출력되는지를
      확인해 보기 위한 과정인데, 아마 자동 인덴팅이 있어서 
      좀 그래보이네...
      `,
    },
  ];
  function inputAlldata() {
    typeInputForm(inputDataSet);
    selectRadioForm(radioInputDataSet);
    typeTextareaForm(textareaDataSet);
  }
  describe("존재 여부", () => {
    before(() => {
      cy.visit("/create");
    });
    function isExist(desc, selector) {
      it(desc, () => {
        cy.get(selector);
      });
    }
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
});
