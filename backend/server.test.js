const { fetchTicketsFromReportCache } = require("./server");

test('Testing test tickets from filter', () => {
  expect(fetchTicketsFromReportCache({ "room": "128" }).equalTo()
})
