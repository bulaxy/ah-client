const groupBy = (xs, key) => {
    return xs.reduce((rv, x) => {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

const mapToKey = (arr, key) => {
    return arr.map(o => o[key])
}

// Throttle to make sure it doesnt make too many calls and there will be a delay before it can be called again
const throttle = (cb, delay = 500) => {
    let pending = false
    let pendingArgs

    const timeoutFunc = () => {
        if (pendingArgs == null) {
            pending = false
        } else {
            cb(...pendingArgs)
            pendingArgs = null
            // Reset the timeout function and variables 
            setTimeout(timeoutFunc, delay)
        }
    }

    return (...args) => {
        if (pending) {
            pendingArgs = args
            return
        }
        cb(...args)
        pending = true

        setTimeout(timeoutFunc, delay)
    }
}

const objectKeyToCamelCase = (obj) => {
    let rtn = obj
    if (!rtn) {
        return rtn
    } else if (typeof (obj) === 'object') {
        if (obj instanceof Array) {
            rtn = obj.map(objectKeyToCamelCase)
        } else {
            rtn = {}
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    const newKey = key.replace(/(_\w)/g, k => k[1].toUpperCase())
                    rtn[newKey] = objectKeyToCamelCase(obj[key])
                }
            }
        }
    }
    return rtn
}

const camelStringToSpace = (string) => {
    return string.replace(/[a-z]/gi, (m, o) => (m < {} && o) ? ` ${m}` : (o) ? m : m.toUpperCase())
}

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

const sumArr = (arr, key) => {
    if (key) {
        return arr.map(o => o[key]).reduce((a, b) => a + b, 0)
    }
    return arr.reduce((a, b) => a + b, 0)
}

const arrayToObject = (arr, key) => {
    console.log(arr)
    return arr?.reduce((obj, item) => {
        obj[item[key]] = item
        return obj
    }, {})
}

export {
    groupBy,
    mapToKey,
    objectKeyToCamelCase,
    camelStringToSpace,
    sumArr,
    capitalize,
    arrayToObject,
}

