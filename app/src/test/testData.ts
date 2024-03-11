import { User } from "firebase/auth";
import Account from "../models/Account/Account";
import Card from "../models/Card/Card";
import CardSet from "../models/Card/CardSet";

export const mockUser = {
  uid: "user123",
  displayName: "John Doe",
  email: "john.doe@example.com",
  photoURL: "https://example.com/photo.jpg",
} as Partial<User>;
export const mockCards: Card[] = [
  {
    id: "card1",
    question: "What is React?",
    answer: "A JavaScript library for building user interfaces",
    attempts: 5,
    successes: 3,
    failures: 2,
  },
];

export const mockSetAccount = jest.fn();

export const mockCardSets: CardSet[] = [
  {
    title: "React Basics",
    description: "Introduction to React concepts",
    cards: mockCards,
    quizzes: ["quiz1"],
  },
  {
    title: "Vue Basics",
    description: "Introduction to Vue concepts",
    cards: mockCards,
    quizzes: ["quiz2"],
  },
];

export const mockAccount: Account = {
  _id: "1",
  uid: "user123",
  displayName: "John Doe",
  photoURL: "https://example.com/photo.jpg",
  email: "john.doe@example.com",
  cardSets: mockCardSets,
};
