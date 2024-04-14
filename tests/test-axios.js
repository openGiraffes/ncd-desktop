const axios = require('axios')

let responseURL =
    'https://fastly.jsdelivr.net/gh/openGiraffes/openGiraffes-store-db@gh-pages/data.json'
try {
    axios
        .get(responseURL)
        .then((result) => {
            console.log(result.data)
        })
        .catch((error) => {
            console.log(error)
        })
} catch (err) {
    console.log(err)
}
