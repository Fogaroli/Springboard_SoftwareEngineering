# Part One:

- What is HTTP?
The protocol used to transfer web page information between client (mostly browsers) and server (web_Servers). It is just one of th eprotocols on the Internet.

- What is a URL?
An address to indicate where a resource can be found. This address is mostly composed of a protocol description, the hostname, and the resource location on the hostname.

- What is DNS?
The protocol used to identify the exact location of a server based on its hostname (also valid for reverse search).

- What is a query string?
The string added to the URL used to the pass information to a resource, e.g. the subject of a search, passed to the source resource.

- What are two HTTP verbs and how are they different?
Two examples are GET and POST. Get is used to read information from a HTTP server, where the resource is defined in the URL along with other parameters sent as a header. POST is used to send information to thehttp server, that can later be used by the server for varios objects, e.g. to store on the database.

- What is an HTTP request?
Is the message sent from the client (mostly browser) to the server with the specification of the method used and the resource, along with other information passed on the header of the request.

- What is an HTTP response?
The response message sent from the server for the request received.

- What is an HTTP header? Give a couple examples of request and response headers you have seen.
The header is the collection of parameters sent with an http message, could be used to indicate, language, time, location, cookies and any other useful information to interpret the content of the reponse.

- What are the processes that happen when you type “http://somesite.com/some/page.html” into a browser?
The breoser generates a GET http request to the hostname somesite.com for the resource same/page.html.
The GET request contains the protocol version, the method, the resource along with other information on the header of the request.
The hostname is translated into an IP Address by the DNS server (if the information isn't chached on a early layer), allowting the get request to be sent to the destination server.
The server receives the request, and if it has a valid resource as requested, it send a response back to the browser with a header providing any additional information needed to interpret the body of the response.
The rpowser than parses the content of the header and the body of the reponse and renders the relevant information to the user. Any additional information required to render the resource wil generate sequesntial GET requests.


# Part Two
1. Using ***curl***, make a ***GET*** request to the *icanhazdadjoke.com* API to find all jokes involving the word “pirate”
Using RESTED extension on Chrome. GET request to https://icanhazdadjoke.com/search?term=pirate

2. Use ***dig*** to find what the IP address is for *icanhazdadjoke.com*
172.67.198.173


3. Make a simple web page and serve it using ***python3 -m http.server***. Visit the page in a browser.
Done, easy!


# **Part Three: Explore Dev Tools**

Build a very simple HTML form that uses the GET method (it can use the same page URL for the action) when the form is submitted.
Add a field or two to the form and, after submitting it, explore in Chrome Developer tools how you can view the request and response headers.
Edit the page to change the form type to POST, refresh in the browser and re-submit. Do you still see the field in the query string? Explore in Chrome how you can view the request and response headers, as well as the form data.

Using POST there is no ? in the request URL of the request header

## **Part Four: Explore the URL API**

At times, it’s useful for your JavaScript to look at the URL of the browser window and change how the script works depending on parts of that (particularly the query string).
[Read about the URL API](https://developer.mozilla.org/en-US/docs/Web/API/URL)
Try some of the code examples in the Chrome Console so that you can get comfortable with the basic methods and properties for instances of the URL class.

const currentURL = new URL(window.location.href)
Also https://developer.mozilla.org/en-US/docs/Web/API/URL_API