const createEmployeeRecord = (employee) => {
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3], 
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = (employees) => {
    console.log(employees)
    return employees.map(employee => createEmployeeRecord(employee))
}

const createTimeInEvent = (employee, timeDate) => {
    let [date, hour] = timeDate.split(" ")
    let timeObj = {
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    }
    employee.timeInEvents.push(timeObj)
    return employee
}

const createTimeOutEvent = (employee, timeDate) => {
    let [date, hour] = timeDate.split(" ")
    let timeObj = {
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    }
    employee.timeOutEvents.push(timeObj)
    return employee
}

const hoursWorkedOnDate = (employee, date) => {
    const timeIn = employee.timeInEvents.find(event => event.date === date)
    const timeOut = employee.timeOutEvents.find(event => event.date === date)
    return (timeOut.hour - timeIn.hour)/100
}    
const wagesEarnedOnDate = (employee, date) => {
    let hoursWorked = hoursWorkedOnDate(employee, date)
    return hoursWorked * employee.payPerHour
}

const allWagesFor = (employee) => {
    let newArr = []
    employee.timeOutEvents.map(tOut => {
        employee.timeInEvents.map(tIn => {
            if (tIn.date === tOut.date) {
                newArr.push(((tOut.hour - tIn.hour)/100)*employee.payPerHour)
            }
        })
    })  
    //newarr=[324, 54]
    const sum = newArr.reduce((accum, value) => accum + value, 0)
    return sum
}

const calculatePayroll = (employeeRecords) => {
    let sumArr = []
    for (const employee of employeeRecords) {
        sumArr.push(allWagesFor(employee))
    }    
    const totalSum = sumArr.reduce((accum, value) => accum + value, 0)
    return totalSum
}

// ### `calculatePayroll`

// * **Argument(s)**
//   * `Array` of employee records
// * **Returns**
//   * Sum of pay owed to all employees for all dates, as a number
// * **Behavior**
//   * Using `wagesEarnedOnDate`, accumulate the value of all dates worked by the
//     employee in the record used as context. Amount should be returned as a
//     number.