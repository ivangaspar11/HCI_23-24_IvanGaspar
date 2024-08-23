// Represents the image details of a travel destination
interface TravelPhoto {
  url: string;
  title: string;
  description: string;
  width: number;
  height: number;
}

// Represents a single travel destination item
interface TravelDestinationItem {
  sys: {
    id: string;
  };
  title: string;
  description: {
    json: any; // Assuming Contentful's rich text JSON format
  };
  photo: TravelPhoto;
  departureDate: string;
  returnDate: string;
  price: number;
  category: string;
}

// Represents the response structure for a single travel destination item
interface TravelDestinationResponse {
  travelDestination: TravelDestinationItem;
}

// Represents the response structure for multiple travel destination items
interface TravelDestinationCollectionResponse {
  travelDestinationCollection: {
    items: TravelDestinationItem[];
  };
}

// Represents the simplified structure used in the application
export interface DestinationListItem {
  id: string;
  title: string;
  description: any; // Adjust according to your application's usage
  photo: {
    url: string;
  };
  departureDate: string;
  returnDate: string;
  price: number;
  category: string;
}
