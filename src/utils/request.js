import axios from "axios";
const request = axios.create({
  // baseURL: "/chatapp/api/v1",
  // baseURL: "http://portal.iitb.ac.in/chatapp/api/v1",
  // baseURL: "http://10.157.1.30:8449/chatapp/api/v1",
  // baseURL: "http://10.99.1.194:30082/chatapp/api/v1",
  baseURL: "http://localhost:4000/chatapp/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});
export default request;

// import axios from "axios";
                                              
// let protocol = window.location.protocol;    // get protocol and hostname dynamically
// let hostname = window.location.hostname;

// let baseURL = '';

// // Check if the hostname is 'localhost' or '127.0.0.1' for local development
// if (hostname === 'localhost' || hostname === '127.0.0.1') {
//   // In case of local development, specify the port and protocol (HTTP or HTTPS)
//   baseURL = `${protocol}//${hostname}:4000/chatapp/api/v1`;
// } else {
//   // In production or other environments, build the URL without the port (or customize further)
//   baseURL = `portal.iitb.ac.in/chatapp/api/v1`;  // Assuming the API is hosted without a port number
// }

// // Create the axios instance with dynamically generated baseURL
// const request = axios.create({
//   baseURL: baseURL,  // Use dynamic baseURL
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default request;


// import axios from "axios";

// const request = axios.create({
//   baseURL: "/chatapp/api/v1",  // Omit the full domain, it's handled by the proxy
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default request;



// import axios from "axios";
                                              
// let protocol = window.location.protocol;    // get protocol and hostname dynamically
// let hostname = window.location.hostname;

// let baseURL = '';

// // Check if the hostname is 'localhost' or '127.0.0.1' for local development
// if (hostname === 'localhost' || hostname === '127.0.0.1') {
//   // In case of local development, specify the port and protocol (HTTP or HTTPS)
//   baseURL = `${protocol}//${hostname}:4000/chatapp/api/v1`;
// } else {
//   // In production or other environments, build the URL without the port (or customize further)
//   baseURL = `${protocol}//${hostname}/chatapp/api/v1`;  // Assuming the API is hosted without a port number
// }

// // Create the axios instance with dynamically generated baseURL
// const request = axios.create({
//   baseURL: baseURL,  // Use dynamic baseURL
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default request;



// import axios from "axios";

// const request = axios.create({
//   baseURL: "http://portal.iitb.ac.in/chatapp/api/v1",
//   // baseURL: "http://10.157.1.30:8449/chatapp/api/v1",
//   // baseURL: "http://10.99.1.194:30082/chatapp/api/v1",
//   // baseURL: "http://localhost:4000/chatapp/api/v1",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default request;