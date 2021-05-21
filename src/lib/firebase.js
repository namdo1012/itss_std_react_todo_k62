import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDUamkQSbsEE1drN4T_cK1kq9XBIt3kCHs",
  authDomain: "itss-todo-app.firebaseapp.com",
  projectId: "itss-todo-app",
  storageBucket: "itss-todo-app.appspot.com",
  messagingSenderId: "352581114710",
  appId: "1:352581114710:web:3fc3843f07be55495f94f7",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export const getTodoItems = async () => {
  try {
    const snapshot = await db.collection("todos").get();
    const items = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return items;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const addTodoItem = async (item) => {
  try {
    const todoRef = db.collection("todos");
    await todoRef.add(item);
  } catch (err) {
    console.log(err);
  }
};

export const updateTodoItem = async (item, id) => {
  try {
    const todoRef = db.collection("todos").doc(id);
    await todoRef.update(item);
  } catch (err) {
    console.log(err);
  }
};

export const clearTodoItem = async (item) => {
  const todoRef = db.collection("todos").doc(item.id);
  await todoRef
    .delete()
    .then(function () {})
    .catch(function (err) {
      console.log(err);
    });
};

export default firebase;
