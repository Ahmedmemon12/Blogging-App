 import {
    initializeApp,
 } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";

 import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,

 } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

 import {
  getFirestore,
  collection, addDoc,
  getDocs, doc , setDoc
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";



 const firebaseConfig = {
   apiKey: "AIzaSyAwd8-VkNSEJpBVVO5E3594x1jqiqEPcDA",
   authDomain: "blog-app-ead54.firebaseapp.com",
   projectId: "blog-app-ead54",
   storageBucket: "blog-app-ead54.appspot.com",
   messagingSenderId: "127655680320",
   appId: "1:127655680320:web:ad343a803d9c375f23c2a5",
   measurementId: "G-7ZK1C708HL"
 };

 // Initialization
 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 const db = getFirestore(app);
 const blogCollectionRef = collection(db, "blogs");




const signUpForm = document.getElementById('SignUpForm');
const logInForm = document.getElementById('LogInForm');


// console.log(Loader);

onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      getBlogs()
      if(!window.location.href.includes('blog')){
      window.location.href = "blog.html"
      console.log("logged in");
    }
    if(window.location.href.includes('blog')){
        authenticationBtn.style.display = 'none'
        signOutBtn.style.display = 'block'
        addBlog.style.display = 'block'
      }

      // ...
    } else {
      // User is signed out
      if(window.location.href.includes('blog')){
        authenticationBtn.style.display = 'block'
      signOutBtn.style.display = 'none'
      addBlog.style.display = 'none'
      blogForm.style.display = 'none'

    }
      // ...
    }
  });

signUpForm?.addEventListener("submit",(e)=>{
    e.preventDefault()
    console.log(e)
    const userInfo = {
    Name : e.target[0].value,
    email : e.target[1].value,
    password : e.target[2].value, 
    Gender : e.target[4].value
    }

    console.log(userInfo.Name);
    console.log(userInfo.email);
    console.log(userInfo.password);
    console.log(userInfo.Gender);
 
    const ConfirmPass = e.target[3].value
    if(userInfo.password == ConfirmPass){
    createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
  .then(async userCredential => {
    const user = userCredential.user;
    const userRef = doc(db , "users" , user.uid)
    await setDoc(userRef , userInfo)

    window.location.href = 'blog.html'    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert('User is not Register Because of' + errorMessage)
    // ..
  });
}
else if (userInfo.password != ConfirmPass){
  alert('password are not Same')
}
})

logInForm?.addEventListener("submit",(e)=>{
    e.preventDefault()
    console.log(e)
    const email = e.target[0].value
    const password = e.target[1].value

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    window.location.href = 'blog.html'    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
})

signOutBtn?.addEventListener('click', ()=>{
    signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
})

//     X------------------------------------- Fire Store Starts -----------------------------------------------------X


blogForm?.addEventListener('submit', async (e)=>{
  e.preventDefault()
  console.log(e)
  try {
    const blogsRef = await addDoc(blogCollectionRef, {
      title: e.target[1].value,
      description: e.target[2].value,
      born: 1815
    });
    console.log("Document written with ID: ", blogsRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

})

async function getBlogs(){
 const querySnapshot = await getDocs(blogCollectionRef);
  querySnapshot.forEach((doc) => {
    console.log(doc.id);
    console.log(doc.data());
  });
}
