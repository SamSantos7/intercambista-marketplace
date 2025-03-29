
export type UserRole = 'advertiser' | 'client' | 'admin';

export interface User {
  id: string;
  fullName: string;
  email: string;
  location: string;
  profileImage?: string;
  description: string;
  role: UserRole;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdvertiserProfile extends User {
  skills: string[];
  experience: string;
  portfolio?: string;
  rating: number;
  totalReviews: number;
  identityVerified: boolean;
}

export interface ClientProfile extends User {
  purchaseHistory: number;
  savedServices: string[];
}

export interface AdminProfile extends User {
  permissions: string[];
  lastActive: Date;
}
