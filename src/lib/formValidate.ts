export const validateEmail = (email: string ) => {
  const validRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!email) {
    return "Email is required.";
  } else if (!validRegex.test(email)) {
    return "Please enter a valid email address";
  }
};

export const validatePassword = (password : string) => {
    const validRegex =
     /^(?=.[a-z])(?=.[A-Z])(?=.*\W).{5,}$/;
    if (!password) {
      return "Password is required.";
    } else if(!validRegex.test(password)) {
      return "Password must include a special character, uppercase, lowercase and minimum of 5 characters";
  }
  };