const { calculateTip, celsiusToFahrenheit, fahrenheitToCelsius, add } = require('../src/math')

test('Should Calculate Total With Tip', () => {
     const total = calculateTip(10, .3);
     expect(total).toBe(13)

})

test('Should Calculate Total With Default Tip', () => {
     const total = calculateTip(10);
     expect(total).toBe(12.5)

})

test('Should Calculate fahrenheit to celsius', () => {
     const temp = fahrenheitToCelsius(32);
     expect(temp).toBe(0);
})

test('Should Calculate celsius to fahrenheit ', () => {
     const temp = celsiusToFahrenheit(0);
     expect(temp).toBe(32);
})

test('Should add two numbers', (done) => {
     add(2, 5).then((sum) => {
          expect(sum).toBe(7)
     })
     done()
})

test('Should add two numbers async/await ', async () => {
     const sum = await add(10, 22);
     expect(sum).toBe(32);
})