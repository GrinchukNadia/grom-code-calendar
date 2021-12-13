const getMethodsNames = {
    years: 'getFullYear',
    months: 'getMonth',
    days: 'getDate',
    hours: 'getHours',
    minutes: 'getMinutes',
    seconds: 'getSeconds',
    milliseconds: 'getMilliseconds',
};

const setMethodsNames = {
    years: 'setFullYear',
    months: 'setMonth',
    days: 'setDate',
    hours: 'setHours',
    minutes: 'setMinutes',
    seconds: 'setSeconds',
    milliseconds: 'setMilliseconds',
};

// ф-ция помогает добавить или отнять определенное количество времени от заданного
// урпощенный аналог популярной библиотеки moment
const shmoment = date => {
    let result = new Date(date);

    const calculator = {
        add(units, value) {
            const currentUnitValue = result[getMethodsNames[units]]();
            result = new Date(
                result[setMethodsNames[units]](currentUnitValue + value),
            );
            return this;
        },
        subtract(units, value) {
            return this.add(units, -value);
        },
        result() {
            return result;
        },
    };

    return calculator;
};

// let now = shmoment('12-11-2021')
// console.log(now.subtract('years', 3).result());

export default shmoment;
