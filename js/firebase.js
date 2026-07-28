/* ============================================================
   TFDrills — Firebase bootstrap
   Initializes the Firebase app, Auth, and Firestore, and exposes
   a small Auth helper the rest of the app talks to.
   ============================================================ */

firebase.initializeApp(FIREBASE_CONFIG);
const db = firebase.firestore();
const fbAuth = firebase.auth();

const Auth = (() => {
  let _user = null;
  let _ready = false;
  const _listeners = [];

  fbAuth.onAuthStateChanged((user) => {
    _user = user;
    _ready = true;
    _listeners.forEach((fn) => fn(user));
  });

  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return fbAuth.signInWithPopup(provider).catch((err) => {
      console.error("Sign-in failed:", err);
      if (window.App) App.toast("Sign-in failed — please try again.");
    });
  }

  function signOutUser() {
    return fbAuth.signOut();
  }

  function currentUser() {
    return _user;
  }

  function isReady() {
    return _ready;
  }

  function onChange(fn) {
    _listeners.push(fn);
    if (_ready) fn(_user);
  }

  return { signInWithGoogle, signOutUser, currentUser, isReady, onChange };
})();
