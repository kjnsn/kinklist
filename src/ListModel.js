import firebase from "firebase";

export default class ListModel {
  constructor() {
    // Authenticate to the cloud datastore.
    firebase.initializeApp({
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      projectId: "kinklist-28a79"
    });

    // Setup the connection to the cloud datastore.
    this.db = firebase.firestore();
  }

  createList() {
    return this.getDefaultOptions()
      .then(defaults => {
        return defaults.map(optionName => ({
          title: optionName,
          enabled: false
        }));
      })
      .then(defaults => {
        return this.db
          .collection("lists")
          .add({
            list: defaults
          })
          .then(docRef => {
            return docRef.id;
          });
      });
  }

  updateList(id, listData) {
      return this.db.collection("lists").doc(id).update({
          list: listData
      });
  }

  getList(id) {
    // Get the list of options from the datastore.
    return this.db
      .collection("lists")
      .doc(id)
      .get()
      .then(doc => {
        const data = doc.data();
        if (data && data.list) {
          return data.list;
        }
        return [];
      });
  }

  getDefaultOptions() {
    // Get the list of options from the datastore.
    return this.db
      .collection("seed-data")
      .doc("options")
      .get()
      .then(doc => {
        const data = doc.data();
        if (data && data.options) {
          return data.options;
        }

        return [];
      });
  }
}
