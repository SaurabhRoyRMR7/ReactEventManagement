export interface Event {
    eventId: number;
    title: string;
    date: string;
    time: string;
    location: string;
    capacity: number;
    startDate?:string;
    price?:string;
  }