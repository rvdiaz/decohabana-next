export interface IImage {
  url: string;
  alt: string;
  s3Key: string;
}

export interface ICreateQuoteInput {
  eventType: string;
  otherEventType?: string;
  date: string;
  location: string;
  peopleCount: number;
  inspirationImages?: IImage[];
  needChairs?: boolean;
  chairsCount?: number;
  needTables?: boolean;
  tablesCount?: number;
  needTents?: boolean;
  tentsCount?: number;
  contactInfo: {
    email: string;
    name: string;
    phone: string;
  };
}
