import { Calendar, Heart, Cake, Sparkles, Building2 } from "lucide-react";

const eventTypes = [
  {
    id: "wedding",
    label: "Wedding",
    icon: Heart,
    color: "bg-rose-100 text-rose-700",
  },
  {
    id: "birthday",
    label: "Birthday Party",
    icon: Cake,
    color: "bg-amber-100 text-amber-700",
  },
  {
    id: "gender-reveal",
    label: "Gender Reveal",
    icon: Cake,
    color: "bg-amber-100 text-amber-700",
  },
  {
    id: "baby-shower",
    label: "Baby Shower",
    icon: Sparkles,
    color: "bg-red-800/10 text-red-800",
  },
  {
    id: "picnic",
    label: "Picnic",
    icon: Building2,
    color: "bg-slate-100 text-slate-700",
  },
  {
    id: "other",
    label: "Other",
    icon: Calendar,
    color: "bg-gray-100 text-gray-700",
  },
];
export { eventTypes };
