// beforeAll(() => console.log('beforeAll'));
// afterAll(() => console.log('afterAll'));
// beforeEach(()=>console.log('beforeEach'))
console.log('同步1');
describe('describe', () => {
  console.log('同步2');
  beforeAll(() => console.log('describe beforeAll'));
  afterAll(() => console.log('describe afterAll'));
  test('test 1 ', () => console.log('test 1'));
});
console.log('同步3');
test('test 2 ', () => console.log('test 2'));
// test.only('test 2 only', () => console.log('test 2 only'));
beforeAll(() => console.log('=========== start beforeAll==========='));
afterAll(() => console.log('============== end afterAll =========='));
beforeEach(() => console.log('==============  beforeEach =========='));
 