export const formatCount = num => {
    return num / 10000 > 9
        ? num / 10000 > 10000
            ? `${(num / 100000000).toFixed(1)}亿`
            : `${Math.ceil(num / 10000)}万`
        : Math.floor(num)
}

export const formatName = arr => {
    let str = ''
    arr.forEach((item, index) => {
        str += index === arr.length - 1 ? item.name : item.name + '/'
    })
    return str
}

export const findIndex = (list, music) => {
    return list.findIndex(item => {
        return item.id === music.id
    })
}

export const addZero = (s) => {
    return s < 10 ? '0' + s : s
}

export const formatTime = (time) => {
    let s = Math.floor(time / 1000)
    let minute = Math.floor(s / 60)
    let second = Math.floor(s % 60)
    return `${addZero(minute)}:${addZero(second)}`
}