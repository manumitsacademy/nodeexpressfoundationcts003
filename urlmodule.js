var url = require('url');
var myurl = new URL("https://example.org/abc?username='praveen'&id='112233'&place='hyd'#productdetails123");
console.log(myurl.searchParams.get('username'));
console.log(myurl.searchParams.get('id'));
console.log(myurl.searchParams.get('place'));
console.log(myurl.hash);