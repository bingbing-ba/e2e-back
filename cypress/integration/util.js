function typeInputForm(dataSet) {
  for (let {selector,data} of dataSet) {
    cy.get(selector).type(data)
  }
}

function selectRadioForm(dataSet) {
  for (let {selector,data} of dataSet) {
    cy.get(`${selector}[value="${data}"]`).click()
  }
}

function typeTextareaForm(dataSet) {
  for (let {selector,data} of dataSet) {
    cy.get(selector).type(data)
  }
}

function isExist(desc, selector) {
  it(desc, () => {
    cy.get(selector);
  });
}

export {
  typeInputForm,
  selectRadioForm,
  typeTextareaForm,
  isExist,
}