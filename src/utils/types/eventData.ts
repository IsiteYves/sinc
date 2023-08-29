import { StaticImageData } from "next/image";

export type EventDatas = {
  image: StaticImageData;
  name: string;
  location: string;
  date: string;
};

export type EventDatasProps = {
  results: EventDatas[];
};

// export type EventContext = {
//   id: number;
//   name: string;
//   users: number;
//   events: number;
//   imageId: number;
//   // Add other properties from the EventContext object if needed
// };

// export type EventOrganizerProfile = {
//   id: number;
//   ownerId: number;
//   isActive: boolean;
//   createdAt: string;
//   updatedAt: string;
//   // Add other properties from the OrganizerProfile object if needed
// };

export type Location = {
  crs: {
    type: string;
    properties: {
      name: string;
    };
  };
  type: string;
  coordinates: [number, number];
};

// export type data = {
//   Comments: any[]; // Change 'any' to the appropriate type if you have a specific comment interface
//   EventContext: EventContext;
//   EventContextId: number;
//   EventId: number;
//   Likes: any[]; // Change 'any' to the appropriate type if you have a specific like interface
//   OrganizerProfile: EventOrganizerProfile;
//   OrganizerProfileId: number;
//   PostId: null;
//   attending: number;
//   createdAt: string;
//   description: string;
//   endDate: string;
//   fileId: number;
//   flyer: string;
//   id: number;
//   imageId: number;
//   isAcceptable: boolean;
//   location: Location;
//   locationName: string;
//   maxAttendance: number;
//   name: string;
//   pastFlyers: any[]; // Change 'any' to the appropriate type if you have specific past flyer interface
//   privacy: string;
//   setup: string;
//   startDate: string;
//   updatedAt: string;
//   userId: number;
//   commentCount: string;
//   hasCommented: boolean;
//   hasLiked: boolean;
//   hasSinced: boolean;
//   likeCount: string;
//   sincCount: string;
//   type: string; // Example: '2023-07-28T10:55:11.011Z'
// };

export type EventPagination = {
  current: number; // Example: 1
  limit: number; // Example: 25
  total: number; // Example: 14
};

interface OrganizerProfile {
  id: number;
  ownerId: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface EventContext {
  id: number;
  name: string;
  users: number;
  events: number;
  imageId: number;
  icon: string;
  fileId: number;
  createdAt: string;
  updatedAt: string;
}

export type EventSchema = {
  id: number;
  userId: number;
  name: string;
  description: string;
  flyer: string;
  imageId: number;
  fileId: number;
  OrganizerProfileId: number;
  location: Location;
  locationName: string;
  isAcceptable: boolean;
  EventContextId: number;
  pastFlyers: any[]; // Replace 'any' with the correct type if possible
  maxAttendance: number;
  attending: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  setup: string;
  privacy: string;
  PostId: number | null; // Replace 'number' with the correct type of PostId if applicable
  OrganizerProfile: OrganizerProfile;
  EventContext: EventContext;
};

export type SubData = {
  Comments: any;
  Event: EventSchema;
  EventId: number;
  Likes: any;
  OrganizerProfileId: number;
  commentCount: string;
  createdAt: string;
  hasCommented: boolean;
  hasLiked: boolean;
  hasSinced: boolean;
  id: number;
  likeCount: string;
  sincCount: string;
  type: string;
  updatedAt: string;
  userId: number;
};

export type Data = {
  count: number;
  event: SubData[];
  pagination: EventPagination;
};

export type Datatype = {
  event: Data;
  message: string;
  statusCode: string;
};

export enum IEVENT_SETUP_ENUMS {
  ONSITE = "ONSITE",
  REMOTE = "REMOTE",
}
