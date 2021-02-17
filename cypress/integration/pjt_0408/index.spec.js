import testCreate from './create.spec'
import testMain from './main.spec'
import testDetail from './detail.spec'

function testAll(){
  testCreate()
  testMain()
  testDetail()
}

const toTest = Cypress.env('toTest')

switch (toTest) {
  case 'create':
    testCreate()
    break;
  case 'main':
    testMain()
    break;
  case 'detail':
    testDetail()
    break;
  case 'all':
    testAll()
    break;
  default:
    break;
}