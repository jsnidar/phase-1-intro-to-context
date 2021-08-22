// Your code here
function createEmployeeRecord (array) {
const firstName = array[0]
const familyName = array[1]
const title = array[2]
const payPerHour = array[3]
const employeeRecord = {firstName: firstName, familyName: familyName, title: title, payPerHour: payPerHour, timeInEvents: [], timeOutEvents: []}
return employeeRecord;
}

function createEmployeeRecords (array) {
const employeeRecords = []
array.forEach(employee => {
    debugger
    const employeeRecord = createEmployeeRecord(employee)
    employeeRecords.push(employeeRecord)
    })
return employeeRecords
}

function createTimeInEvent (employeeObj, dateStamp) {
    const timeInArray = employeeObj.timeInEvents
    const timeInEventObj = {type: 'TimeIn', hour: parseInt(dateStamp.substr(11, 4)) , date: dateStamp.substr(0,10)}
    timeInArray.push(timeInEventObj)
    return employeeObj
}

function createTimeOutEvent (employeeObj, dateStamp) {
    const timeOutArray = employeeObj.timeOutEvents
    const timeOutEventObj = {type: 'TimeOut', hour: parseInt(dateStamp.substr(11, 4)) , date: dateStamp.substr(0,10)}
    timeOutArray.push(timeOutEventObj)
    return employeeObj
}

function hoursWorkedOnDate (employeeObj, eventDate) {
    debugger
    const timeInArray = employeeObj.timeInEvents
    const timeInObj = timeInArray.filter(obj => obj.date === eventDate)
    const timeOutArray = employeeObj.timeOutEvents
    const timeOutObj = timeOutArray.filter(obj => obj.date === eventDate)
    return (timeOutObj[0].hour - timeInObj[0].hour)/100
}
function wagesEarnedOnDate (employeeObj, eventDate) {
const hoursWorked = hoursWorkedOnDate(employeeObj, eventDate)
return employeeObj.payPerHour * hoursWorked 
}

function allWagesFor(employeeObj) {
    const datesArr = []
    employeeObj.timeInEvents.forEach(event => datesArr.push(event.date))
    const wagesArr = []
    //for each date in the datesArr perform wagesEarnedOnDate and then reduce that array
    datesArr.forEach(date => wagesArr.push(wagesEarnedOnDate(employeeObj, date)))
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return wagesArr.reduce(reducer)
}

function calculatePayroll (employeesArray) {
    const wageArr = []
    employeesArray.forEach(employee => wageArr.push(allWagesFor(employee)))
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return wageArr.reduce(reducer)
}
const exampleRecord = {
    firstName: 'f1', 
    familyName: 'l1', 
    title: 'pos1', 
    payPerHour: 1, 
    timeInEvents: [
        {type: 'TimeIn', hour: 300, date: '2021-08-21'}
    ], 
    timeOutEvents: [
        {type: 'TimeOut', hour: 800, date: '2021-08-21'}
    ]
}
// hoursWorkedOnDate(exampleRecord, '2021-08-21')
