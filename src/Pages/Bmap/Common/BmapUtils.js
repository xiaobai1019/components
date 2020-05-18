export function getCenter(map) {
    map.addEventListener('click', () => {
        console.log(map.getCenter())
    })
}