import type { Lesson } from "../types/lesson";// optional type import if you want to share types via path or copy type locally

export const lessons: Lesson[] = [
  {
    id: "L001",
    date: "2025-10-28T14:00:00Z",
    type: "Historic",
    subject: "Minecraft Game Design - Level 1",
    students: ["Ethan", "Ava"],
    tutor: "Sarah Tan",
    status: "Completed"
  },
  {
    id: "L002",
    date: "2025-11-02T09:00:00Z",
    type: "Historic",
    subject: "Roblox Coding Basics",
    students: ["Lucas"],
    tutor: "Sarah Tan",
    status: "Completed"
  },
  {
    id: "L003",
    date: "2025-11-05T16:00:00Z",
    type: "Historic",
    subject: "Python for Kids - Introduction",
    students: ["Chloe", "Aaron"],
    tutor: "Sarah Tan",
    status: "Completed"
  },
  {
    id: "L004",
    date: "2025-12-31T10:00:00Z",
    type: "Today",
    subject: "Minecraft Redstone Logic",
    students: ["Emma", "Noah"],
    tutor: "Sarah Tan",
    status: "Confirmed"
  },
  {
    id: "L005",
    date: "2025-12-31T15:00:00Z",
    type: "Today",
    subject: "Roblox Game Design - Level 2",
    students: ["Ryan", "Mia"],
    tutor: "Sarah Tan",
    status: "Confirmed"
  },
  {
    id: "L006",
    date: "2026-01-10T12:00:00Z",
    type: "Upcoming",
    subject: "Website Design for Beginners",
    students: ["Olivia"],
    tutor: "Sarah Tan",
    status: "Confirmed"
  },
  {
    id: "L007",
    date: "2026-01-12T11:00:00Z",
    type: "Available",
    subject: "Python for Kids - Game Projects",
    students: [],
    tutor: null,
    status: "Available"
  },
  {
    id: "L008",
    date: "2026-01-13T17:00:00Z",
    type: "Available",
    subject: "Roblox Game Design - Level 1",
    students: [],
    tutor: null,
    status: "Available"
  },
  {
    id: "L009",
    date: "2026-01-14T10:00:00Z",
    type: "Available",
    subject: "Minecraft AI Coding Adventure",
    students: [],
    tutor: null,
    status: "Available"
  },
  {
    id: "L010",
    date: "2026-01-15T09:00:00Z",
    type: "Upcoming",
    subject: "Python Automation for Kids",
    students: ["Elijah"],
    tutor: "Sarah Tan",
    status: "Confirmed"
  }
];