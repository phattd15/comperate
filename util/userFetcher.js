const axios = require('axios');
async function test() {
let data = await axios.get('https://probrate-backend.onrender.com/api/problems/all', {
  pageSize: null
});

console.log(data.data);
};

test();