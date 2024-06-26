import { useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { formValidation } from "../utils/formValidation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, provider } from "./firebase";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const name = useRef("");
  const email = useRef("");
  const password = useRef("");

  const handleCick = () => {
    const errorMessage = formValidation(
      name.current.value,
      email.current.value,
      password.current.value,
      isSignIn
    );
    setErrorMessage(errorMessage);

    // Authentication
    if (errorMessage) return null;

    if (!isSignIn) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;

          // Updating profile with name
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:
              "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  displayName: displayName,
                  email: email,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              // ...
            });
        })
        .catch((error) => {
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <>
      <Header />
      <div className="flex justify-center">
        <form
          action=""
          className="w-11/12 sm:w-8/12 md:w-1/3 mt-[15%] md:mt-[2%] flex flex-col p-5 bg-neutral-800 bg-opacity-85 rounded"
          onSubmit={(e) => e.preventDefault()}
        >
          <h1 className="text-center text-2xl font-semibold mb-5">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h1>

          {!isSignIn && (
            <input
              ref={name}
              type="text"
              className="bg-transparent bg-neutral-900 border border-neutral-900 text-white px-4 py-3 rounded font-semibold outline-0 focus:border-red-600"
              placeholder="Enter Full Name"
            />
          )}
          <input
            ref={email}
            type="email"
            className="bg-transparent bg-neutral-900 border border-neutral-900 text-white px-4 py-3 my-3 rounded font-semibold outline-0 focus:border-red-600"
            placeholder="Enter Email"
          />
          <input
            ref={password}
            type="password"
            className="bg-transparent bg-neutral-900 border border-neutral-900 text-white px-4 py-3 rounded font-semibold outline-0 focus:border-red-600"
            placeholder="Enter Password"
          />

          <p className="text-red-600 mt-2 font-semibold">{errorMessage}</p>

          <button
            className="bg-red-600 py-2.5 font-semibold rounded mt-6 mb-3"
            onClick={() => handleCick()}
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>
          <button
            className="border border-red-600 py-2.5 font-semibold rounded flex items-center justify-center hover:text-red-500"
            onClick={() => handleGoogleLogin()}
          >
            <FcGoogle className="text-xl mr-2" />
            Continue With Google
          </button>
          <p className="text-center mt-6 font-semibold">
            {isSignIn ? "New to youtube? " : "Already sign up? "}

            <span
              className="text-red-500 cursor-pointer hover:underline"
              onClick={() => setIsSignIn(!isSignIn)}
            >
              {isSignIn ? "Sign up now" : "Sign in now"}
            </span>
          </p>
        </form>
      </div>
    </>
  );
};
export default Login;
