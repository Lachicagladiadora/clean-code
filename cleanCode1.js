// CLEAN CODE

// 1. Use meaningful and pronounceable names
const yyyymmdd = moment().format('yyyy-mm-dd')  // It should not be done
const currentDate = moment().format('yyyy-mm-dd')  // As you should do

// 2. Use searchable names
// We read more code than we write. It is important that the code is readable and searchable.

setTimeout(fun,84600000)  // It should not be done
// What does 84600000 mean?

const millisecondsPerDay = 84600000  // As you should do
setTimeout(fun,millisecondsPerDay)  


// 3. Avoid mind mapping ->  clarify and give a representative name to what we are doing
const locations = ['Argentina', 'Brazil', 'Chile', 'Uruguay']
// It should not be done
locations.forEach((u) => {
    f1()
    f2()
    f3(u)
})

// As you should do
locations.forEach((location) => {
    f1()
    f2()
    f3(location)
})


// 4. Do not include unnecessary context in your code ->  If your class/object says something; don't repeat it inside variables
const car = {brandCar:'Honda',modelCar:'Accord'}  // It should not be done
const auto = {brand:'Honda',model:'Accord'}  // As you should do


// 5. Use predefined arguments instead of conditionals -> Predefined arguments are more organized than conditionals
// It should not be done
createStore = (nameUsed) => {
    const nameUsed = nameUsed || 'undefined'
    // stuff
}
// As you should do
createStore = (nameUsed = 'undefined') => {
    // stuff
}

































// It should not be done

// As you should do