export function typeInputForm(dataSet) {
  for (let {selector,data} of dataSet) {
    cy.get(selector).type(data)
  }
}

export function selectRadioForm(dataSet) {
  for (let {selector,data} of dataSet) {
    cy.get(`${selector}[value="${data}"]`).select()
  }
}

export function typeTextareaForm(dataSet) {
  for (let {selector,data} of dataSet) {
    cy.get(selector).type(data)
  }
}
