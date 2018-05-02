// utils
const identity = v => v;

// 1
const equal = (x, y, tolerance = Number.EPSILON) => {
    return Math.abs(x - y) <= tolerance;
}

// 2
const dictionary = source => {
    return source
            .split(/,\s*|\.\s*|\s+/) // 根据具体需求匹配
            .filter(identity)
            .sort((strA, strB) => {
                const lowerStrA = strA.toLowerCase(),
                    lowerStrB = strB.toLowerCase();
                if (lowerStrA > lowerStrB) {
                    return 1;
                } else if (lowerStrA < lowerStrB) {
                    return -1;
                } else {
                    return 0;
                }
            });
}

//3
const get = (obj, keyStr) => {
    const keys = keyStr.split('.').filter(identity);
    if (!keys.length) return;
    return keys.reduce((accumulator, currentKey) => {
        if (accumulator) {
            return accumulator[currentKey];
        }
    }, obj);
}
// key[0] => obj[key[0]]
// key[1] => obj[key[0]][key[1]]
// key[2] => obj[key[0]][key[1]][key[2]]
//...

//4
const forEach = (array, callback) => {
    for (let i = 0; i < array.length; i++) {
        callback && callback(array[i], i, array);
    }
}

//5
const sum = (...args) => args.reduce((acc, cur) => (cur + acc), 0);

//6
const getType = target => {
    // 基础类型
    if (typeof target === 'number') return 'Number';
    if (typeof target === 'string') return 'String';
    if (typeof target === 'boolean') return 'Boolean';
    if (typeof target === 'undefined') return 'Undefined';
    if (typeof target === 'symbol') return 'Symbol';
    if (target == undefined) return 'Null';
    // 复杂类型
    return Object.prototype.toString.call(target).match(/\[object\s(\w+)\]/)[1];
} 