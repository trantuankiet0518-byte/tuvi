export type LoginFormValues = {
  email: string;
  password: string;
};

export type RegisterFormValues = {
  fullName: string;
  email: string;
  password: string;
  acceptedTerms: boolean;
};

export type AuthProfile = {
  authenticated: boolean;
  email?: string;
  name?: string;
};
