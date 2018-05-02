// utils
const identity = v => v;
// 1
const reverseString = str => {
    if (getType(arr) !== 'Array') {
        throw new TypeError();
    }

    let result = '';
    for (let i = str.length - 1; i >= 0; i--) {
        result += str.charAt(i);
    }
    return result;
}

const reverseString2 = str =>
    // 参数校验 ...
    str
        .split('')
        .reverse()
        .join('');

const reverseString3 = str =>
    // 参数校验 ...
    str
        .split('')
        .reduceRight((acc, cur) => (acc + cur));

// 2
const filter = (arr, filterFunc) => {
    if (getType(arr) !== 'Array') {
        throw new TypeError();
    }
        
    if (getType(filterFunc) !== 'Function') {
        throw new TypeError();
    }

    const result = []; 
    for(let i = 0; i < arr.length; i++) {
        if (filterFunc(arr[i])) {
            result.push(arr[i]);
        }
    }
    return result;
}

//3
const getElementsByClassName = (dom, className) => {
    const domCollection = dom.getElementsByTagName('*');
    const domArray = Array.prototype.slice.call(domCollection);
    const matcher = new RegExp(className);
    return domArray.filter(v => matcher.test(v.className));
}

//4
const assign = (targetObj = {}, sourceObj, isDeepCopy) => {
    const sourceObjKeys = Object.keys(sourceObj);
    if (isDeepCopy) {
        assignDeeply(targetObj, sourceObj);

    } else {
        sourceObjKeys
            .forEach(key => {
                targetObj[key] = sourceObj[key];
            });
    }
    return targetObj;
}
const assignDeeply = (targetObj = {}, sourceObj) => {
    
}


//5
const sum = (...prevArgs) => {
    if (!prevArgs.length) return 0;
    return function caculator (...args) {
        if (!args.length) {
            return prevArgs.reduce((acc, cur) => (acc + cur), 0);
        } else {
            prevArgs = prevArgs.concat(args);
            return caculator;
        }
    }
}

const curry = (fnToBeCurried, ...initArgs) => {
    let accumulatedArgs = [...initArgs];
    return function curriedFn(...args) {
        if (!args.length) {
            return fnToBeCurried.apply(this, initArgs);
        } else {
            accumulatedArgs = [...accumulatedArgs, ...args];
            return curriedFn;
        }
    }
}
const sum2 = (...args) => args.reduce((acc, cur) => (acc + cur), 0);
const curriedSum = curry(sum2, 0);