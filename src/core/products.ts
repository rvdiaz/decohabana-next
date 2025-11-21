import { Armchair, Table, Lightbulb, Flower, House } from "lucide-react";

const products = [
  {
    category: "Seating",
    icon: Armchair,
    items: [
      {
        name: "Folding Chairs",
        price: "$3/day",
        image: "product1.jpeg",
      },
      {
        name: "Acrylic Chairs",
        price: "$8/day",
        image: "product5.png",
      },
    ],
  },
  {
    category: "Tables",
    icon: Table,
    items: [
      {
        name: "Round Tables (5ft)",
        price: "$7/day",
        image: "product6.png",
      },
      {
        name: "Rectangle Tables (8ft)",
        price: "$7/day",
        image: "product2.jpeg",
      },
    ],
  },
  {
    category: "Canopy",
    icon: House,
    items: [
      {
        name: "Canopy (20x10ft)",
        price: "$90/day",
        image: "product3.jpeg",
      },
    ],
  },
  {
    category: "Lighting",
    icon: Lightbulb,
    items: [],
  },
  {
    category: "Decorations",
    icon: Flower,
    items: [],
  },
];
export { products };
