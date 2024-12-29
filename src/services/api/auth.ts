import api from './base';

export const authAPI = {
  login: (phone: string, password: string) => 
    api.post('/auth/login/', { phone, password }),
    
  register: (phone: string, password: string) => 
    api.post('/auth/register/', { phone, password }),
    
  verifyPhone: (phone: string, verificationCode: string) =>
    api.post('/auth/verify-phone/', { phone, verification_code: verificationCode }),
    
  getVerificationCode: (phone: string) =>
    api.post('/auth/get-verification-code/', { phone }),
    
  resetPassword: (phone: string, verificationCode: string, newPassword: string, confirmPassword: string) =>
    api.post('/auth/reset-password/', { 
      phone, 
      verification_code: verificationCode,
      new_password: newPassword,
      confirm_password: confirmPassword 
    }),
    
  changePassword: (password: string, newPassword: string, confirmPassword: string) =>
    api.post('/auth/changepassword/', { 
      password,
      new_password: newPassword,
      confirm_password: confirmPassword 
    }),
};