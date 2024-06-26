export const formValidation = (name, email, password, isSignIn) => {
  if (!isSignIn && name !== "undifined") {
    const isNameValid = /\b([A-Za-z][-,a-z. ']+[ ]*)+/.test(name);
    if (!isNameValid) return "Name is not valid";
  }

  const isEmialValid = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/.test(
    password
  );

  if (!isEmialValid) return "Email is not valid";
  if (!isPasswordValid) return "Password is not valid";

  return null;
};
