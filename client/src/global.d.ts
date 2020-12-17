type GlobalState = {
  user: {
    userData: UserData | {};
    userPfp: null | any;
    isFetchingPfp: boolean;
    isDeletingUser: boolean;
    deletingUserError: null | any;
    isDeletingPfp: boolean;
    deletingPfpError: null | any;
    isLoggingIn: boolean;
    loggingInError: null | any;
  };
};

type PersonalUserData = {
  __v: number;
  _id: string;
  country: string;
  email: string;
  firstName: string;
  itineraries: string[];
  lastName: string;
  username: string;
};

type City = {
  __v: number;
  _id: string;
  country: stirng;
  name: string;
  url: string;
};

type PublicUserData = {
  _id: string;
  country: string;
  firstName: string;
  lastName: string;
  pfp: string;
  username: string;
};

type Itinerary = {
  _id: string;
  activities: string;
  creator: string;
  hashtags: string[];
  price: string;
  time: string;
  title: string;
};
