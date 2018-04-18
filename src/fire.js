import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBeVv6XC0ybvq3ajUz1AqwdHB8ZxbWcVOA",
  authDomain: "react-todos-4af4c.firebaseapp.com",
  databaseURL: "https://react-todos-4af4c.firebaseio.com",
  projectId: "react-todos-4af4c",
  storageBucket: "",
  messagingSenderId: "748432345349"
};

const fire = firebase.initializeApp(config);
export {fire};
