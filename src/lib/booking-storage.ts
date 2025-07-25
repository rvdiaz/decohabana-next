import Cookies from "js-cookie";
import { BookingData } from "../types";

const BOOKING_KEY = "luxury-car-booking";
const USER_KEY = "luxury-car-user";

export const saveBookingData = (data: Partial<BookingData>) => {
  try {
    const existingData = getBookingData();
    const updatedData = { ...existingData, ...data };
    Cookies.set(BOOKING_KEY, JSON.stringify(updatedData), { expires: 1 }); // 1 day
    return updatedData;
  } catch (error) {
    console.error("Error saving booking data:", error);
    return data;
  }
};

export const getBookingData = (): BookingData => {
  try {
    const data = Cookies.get(BOOKING_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error getting booking data:", error);
  }

  return {
    from: "",
    to: "",
    date: "",
    time: "",
    selectedCar: null,
    user: null,
    payment: null,
  };
};

export const clearBookingData = () => {
  try {
    Cookies.remove(BOOKING_KEY);
    Cookies.remove(USER_KEY);
  } catch (error) {
    console.error("Error clearing booking data:", error);
  }
};

export const saveUserData = (user: any) => {
  try {
    Cookies.set(USER_KEY, JSON.stringify(user), { expires: 30 }); // 30 days
  } catch (error) {
    console.error("Error saving user data:", error);
  }
};

export const getUserData = () => {
  try {
    const data = Cookies.get(USER_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error getting user data:", error);
  }
  return null;
};

export const clearUserData = () => {
  try {
    Cookies.remove(USER_KEY);
  } catch (error) {
    console.error("Error clearing user data:", error);
  }
};
