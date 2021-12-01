let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function showTime() {
  const date = new Date();
  return (
    date.getHours() +
    "-Hrs:" +
    date.getMinutes() +
    "-Mins:" +
    date.getSeconds() +
    "-Secs"
  );
}

function makePromiseCall(methodType, url, async = true, data = null) {
  let xhr = new XMLHttpRequest();
  return new Promise(function (resolve, reject) {
    xhr.open(methodType, url, async);
    xhr.onreadystatechange = function () {
      
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 201) {
          resolve(xhr.responseText);
        } else if (xhr.status >= 400) {
          reject({
            status: xhr.status,
            statusText: xhr.statusText,
          });
          console.log("XHR Failed");
          console.log("Handle 400 client Error or 500 server error");
        }
      }
    };
    if (data) {
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify(data));
    } else xhr.send();

    console.log(methodType + " request sent to the server at " + showTime());
  });
}

const getURL = "http://localhost:3000/employees/11";
makePromiseCall("GET", getURL, true)
  .then((responseText) => {
    console.log("Get User Data: " + responseText);
  })
  .catch((error) => console.log("GET Error Status: " + JSON.stringify(error)));


const deleteURL = "http://localhost:3000/employees/13";
makePromiseCall("DELETE", deleteURL, false)
  .then((responseText) => {
    console.log("Get User Data: " + responseText);
  })
  .catch((error) => console.log("GET Error Status: " + JSON.stringify(error)));


const postURL = "http://localhost:3000/employees";
const emplData = { name: "Manu", Salary: "330002.32" };
makePromiseCall("POST", postURL, true, emplData)
  .then((responseText) => {
    console.log("Get User Data: " + responseText);
  })
  .catch((error) => console.log("GET Error Status: " + JSON.stringify(error)));
