// Eksampel: 
// {
//     size: "desktop"
// }
const createObject = (object) => {
    if (object.size === "desktop") {
        return new Promise((resolve, reject) => {
            resolve()
        })
    }
    // if (object.size === "phone") {
    //     return
    // }
    // if (object.size === "tablet") {
    //     return
    // }
    // if (object.size === "watch") {
    //     return
    // }
}