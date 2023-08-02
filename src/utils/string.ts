export const uppercaseFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export const getRandomColor = (): string => {
    return `hsl(${360 * Math.random()}, ${25 + (70 * Math.random())}%, ${60 + (10 * Math.random())}%)`
}

export const addOpacityToHSL = (str: string): string => {
    return str.slice(0, str.length - 1) + ', .5' + str.slice(str.length - 1)
}