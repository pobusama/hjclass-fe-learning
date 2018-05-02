// 1 ['a', 'b', 'c', 'd', 'e', 'f', 'g']
const getBingoIndex = members => {
    // params check
    const total = members.length;
    const bingoIndex = total ?
            Math.floor(Math.random() * total) :
            0;
    return bingoIndex;
}
const bingo = (members, bingoCount = 1) => {
    // params check
    const luckyGuys = [];
    const candidates = [...members];
    const length = candidates.length;
    bingoCount = bingoCount > length ? length : bingoCount;
    while (bingoCount > 0) {
        const index = getBingoIndex(candidates);
        luckyGuys.push(candidates[index]);
        candidates.splice(index, 1); //delete
        bingoCount--;
    }
    return luckyGuys;
}

// 2
const zeroPadding = (value) => (value < 10 ? `0${value}` : value);
const getDateStr = (date, format) => {
    // param check
    let returnStr = '',
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        second = date.getSeconds(),
        weekday = date.getDay();
    const patternI = /(yyyy)|(dd)|(hh)|(ss)|(Z)|(d)|(h)|(s)|(o)/ig,
        pattern = /(MM)|(mm)|(M)|(m)/g;

    //替换年、日、小时、秒、时区
    returnStr = format.replace(patternI, (match, ...args) => {
        let [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10] = args;
        if (p1) return year;
        if (p2) return zeroPadding(day);
        if (p3) return zeroPadding(hour);
        if (p4) return zeroPadding(second);
        if (p5) {
            const timeZone = _dateStr.match(/\((.*)\)$/)[1];
            if (timeZone) 
                return timeZone;
            else
                return `${p5}`;
        }
        if (p6) return day;
        if (p7) return hour;
        if (p8) return second;
        if (p9) {
             const offset = - date.getTimezoneOffset();
             const isNegative = offset < 0;
             const offsetByHours = Math.floor(offset / 60);
             const offsetByMins = Math.floor(offset % 60);
             const offsetByHoursAbs = zeroPadding(Math.abs(offsetByHours));
             const offsetByMinsAbs = zeroPadding(Math.abs(offsetByMins));
             return isNegative ? `-${offsetByHoursAbs}:${offsetByMinsAbs}` : `+${offsetByHoursAbs}:${offsetByMinsAbs}`;
        }
        if (p10) {
            const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
            return weekdays[weekday];
        }
    });
    //替换月、分钟
    returnStr = returnStr.replace(pattern, (match, p1, p2, p3, p4) => {
        if (p1) return zeroPadding(month);
        if (p2) return zeroPadding(minute);
        if (p3) return month;
        if (p4) return minute;
    });
    return returnStr;
}

// 3
const getBoundObj = (sourceObj, keys) => {
    const targetObj = {};
    keys.forEach((key) => {
        Object.defineProperty(targetObj, key, {
            get () {
                return sourceObj[key];
            },
            set (val) {
                sourceObj[key] = val;
            },
            enumerable: true,
            configurable: true
        });
    });
    return targetObj;
}

// 4
const Toastr = {
    timeout: 3000,
    setup(options) {
        if (options) {
        this.timout = options.timout;
        }
        this.timer = null
        this.$el = null;
    },
    toast(displayText = '') {
        const $body = $(document.body);
        const toastTempl = `
            <div class="toastr">${displayText}</div>
        `;
        this.$el = $(toastTempl);
        $body.append(this.$el);
        this.timer = setTimeout(() => {
        this.$el.remove();
        }, this.timeout);
    }
};
$('#btn').on('click', () => {
    console.log('toast');
    const myToastr = Object.create(Toastr);
    myToastr.setup();
    myToastr.toast('哈哈哈');
});

// 5 
const ErrorToastr = Object.create(Toastr);
ErrorToastr.toast = function () {
    // 重写
}

const myErrToastr = Object.create(ErrorToastr);
myErrToastr.setup();