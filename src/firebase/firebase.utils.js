import firebase from 'firebase/app';
// import 'firebase/analytics';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBhIQ11rw4K62y4U9_5qHNcSFQRJrNRwQc',
  authDomain: 'new-master-project.firebaseapp.com',
  projectId: 'new-master-project',
  storageBucket: 'new-master-project.appspot.com',
  messagingSenderId: '390543268633',
  appId: '1:390543268633:web:f56c984d3b7da4e4414388',
  measurementId: 'G-XS4H2SGE5B',
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  return userRef;
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollections = collections.docs.map((doc) => {
    const { title, items } = doc.data();
    return {
      title,
      items,
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
    };
  });

  return transformedCollections.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

// export const addCollectionAndDocuments = async (
//   collectionKey,
//   objectsToAdd,
// ) => {
//   const collectionRef = firestore.collection(collectionKey);

//   const batch = firestore.batch();
//   objectsToAdd.forEach((object) => {
//     const newDocRef = collectionRef.doc();
//     batch.set(newDocRef, object);
//   });
//   return await batch.commit();
// };

export default firebase;
