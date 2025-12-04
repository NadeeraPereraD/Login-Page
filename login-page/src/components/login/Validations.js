const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validation = ({ email, password, confirmPassword }) => {
  const errors = {};

  if (!email) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(email)) {
    errors.email = "Invalid email format";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (!passwordRegex.test(password)) {
    errors.password =
      "Password must be 8–12 characters, include uppercase, lowercase, number, and special character";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors; 
};

export default validation;

