export interface IStudio {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
  location: string;
  imageUrl: string;
  amenities: string[];
  overview: string;
}

export interface IReview {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface IStudio {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
  location: string;
  imageUrl: string;
  amenities: string[];
  overview: string;

  // Optional additional information
  galleryImages?: string[];
  ownerEmail?: string;
  hostName?: string;
  hostImage?: string;
  rating?: number;
  reviews?: IReview[];
}
