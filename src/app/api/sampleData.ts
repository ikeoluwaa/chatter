import { Timestamp } from "firebase/firestore";

export const sampleData = [
  {
    id: "1",
    PhotoURL: "",
    author: "Grace Ikpang",
    occupation: "Product designer",
    date: Timestamp.fromDate(new Date(Date.now() + 60 * 8640000)),
    title: "Starting out as a Product designer",
    readTime: "10 mins read",
    content:
      "Embarking on a journey as a product designer can be an exhilarating and fulfilling experience. As a profession that bridges the realms of art, technology, and problem-solving, product design offers an opportunity to shape the way people interact with the world around them.",
    likes: 200,
    comments: 120,
    views: 2980,
    selectedFile: "",
  },
  {
    id: "2",
    PhotoURL: "",
    author: "Oluwatobi Ogunniyi",
    occupation: "Software developer",
    date: Timestamp.fromDate(new Date(Date.now() + 30 * 8640000)),
    title: "Using CSS Selectors",
    readTime: "10 mins read",
    content:
      "Cascading Style Sheets (CSS) is a fundamental technology that lies at the heart of modern web design. It empowers developers and designers to transform plain HTML into visually captivating and interactive web pages.",
    likes: 200,
    comments: 120,
    views: 2980,
    selectedFile: "",
  },

  {
    id: "3",
    PhotoURL: "",
    author: "Adebobola Muhydeen",
    occupation: "Political analyst",
    date: Timestamp.fromDate(new Date(Date.now() + 65 * 8640000)),
    title: "The Impact of social media on Political discourse",
    readTime: "10 mins read",
    content:
      "In the era of digital communication, social media platforms have become pervasive in our daily lives, revolutionizing the way we connect, share information, and engage with the world.",
    likes: 200,
    comments: 120,
    views: 2980,
    selectedFile: "",
  },
];
