export const isValidEmail = (email: string): boolean => /\S+@\S+\.\S+/.test(email.trim());

export const isValidPassword = (password: string): boolean => password.length >= 6;
