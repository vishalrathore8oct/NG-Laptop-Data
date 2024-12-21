function areaOfRectangle(length, width) {
    const areaOfRectangle = length * width
    return areaOfRectangle
}

function areaOfCircle(radius) {
    const areaOfCircle = Math.PI * (radius ** 2)
    return areaOfCircle
}

function areaOfTriangle(base, height) {
    const areaOfTriangle = 0.5 * base * height
    return areaOfTriangle
}

function calculatePaintingCost(dimension1, dimension2, calculateArea) {
    const area = calculateArea(dimension1, dimension2)
    const costPerUnit = 2
    const totalCost = area * costPerUnit

    return totalCost
}

console.log(calculatePaintingCost(5, 10, areaOfRectangle));
console.log(calculatePaintingCost(3, null, areaOfCircle));
console.log(calculatePaintingCost(6, 8, areaOfTriangle));
