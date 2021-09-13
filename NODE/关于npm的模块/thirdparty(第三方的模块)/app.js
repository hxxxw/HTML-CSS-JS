const axios = require('axios');

axios.get(
    'https://www.bilibili.com/video/BV1ca4y1n7u3?p=7'
).then(result => {
    console.log(result);
}
).catch((err) => {
    console.log(err);
})