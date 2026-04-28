export function validateRequired(value: string, fieldName: string = 'Field'): string | null {
  if (!value || value.trim() === '') {
    return `${fieldName} is required`;
  }
  return null;
}

export function validateEmail(email: string): string | null {
  if (!email) return null; // Use validateRequired for required check
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Invalid email format';
  }
  return null;
}

export function validatePhone(phone: string): string | null {
  if (!phone) return null;
  
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  if (!phoneRegex.test(phone)) {
    return 'Invalid phone number format';
  }
  
  if (phone.replace(/\D/g, '').length < 10) {
    return 'Phone number must be at least 10 digits';
  }
  
  return null;
}

export function validateDateOfBirth(dob: string): string | null {
  if (!dob) return null;
  
  const birthDate = new Date(dob);
  const today = new Date();
  
  if (birthDate > today) {
    return 'Date of birth cannot be in the future';
  }
  
  const age = today.getFullYear() - birthDate.getFullYear();
  if (age > 150) {
    return 'Please enter a valid date of birth';
  }
  
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return null;
  
  if (password.length < 6) {
    return 'Password must be at least 6 characters';
  }
  
  return null;
}
