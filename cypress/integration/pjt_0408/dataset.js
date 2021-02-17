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

export {
  inputDataSet,
  radioInputDataSet,
  textareaDataSet,
  selectors,
}