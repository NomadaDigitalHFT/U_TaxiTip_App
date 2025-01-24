export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/; // Al menos 2 caracteres en el dominio
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // Al menos 8 caracteres, una letra mayúscula, un número y un carácter especial
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};
