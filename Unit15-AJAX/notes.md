run a local server with basuc python:
python3 -m http.server

Get the current URL from the loaded page:
const currentURL = new URL(window.location.href)

AJAX - HTTP requests using Javascrit

Originally done using the object XMLHttpRequest. Currently other tools are used to send HTTP requests.

AXIOS

async function whatever(){
    const response = await axios.get('<URL>');
}



async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // shows 10 after 1 second
  wait().then(result => alert(result));
}

f();





Public API, github repository with an updated list


BigO notation

Method to evaluate the performance of a code, size, readability


