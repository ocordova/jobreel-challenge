export interface ServerActionBaseResponse<T> {
  success: boolean;
  error?: string;
  data?: T;
  message?: string;
}

export interface sendOTPResponse extends ServerActionBaseResponse<null> {
  twoFactorRequired?: boolean;
}

export interface ApiResponseEnvelope<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface Job {
  id: string;
  businessName: string;
  title: string;
  location: string;
  tags: string[];
  playbackId: string;
}

export interface CheckOTPData {
  refresh_token: string;
  access_token: string;
  user_id: string;
  is_known: boolean;
}

export interface CheckOTPResponse
  extends ServerActionBaseResponse<CheckOTPData> {}

export interface CreateUserData {
  access_token: string;
  refresh_token: string;
}

export interface CreateUserResponse
  extends ServerActionBaseResponse<CreateUserData> {}

export interface Profile {
  name: string;
  // Add more fields here
}

export interface ProfileResponse extends ServerActionBaseResponse<Profile> {}
