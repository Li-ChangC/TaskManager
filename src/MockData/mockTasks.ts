import { generateUUID } from "../Utils/uuid";

export const mockTasks = [
  { id: generateUUID(), title: "Buy groceries", description: "Milk, Bread, Cheese", completed: false },
  { id: generateUUID(), title: "Call mom", description: "Wish her a happy birthday", completed: false },
  { id: generateUUID(), title: "Complete project", description: "Finish the React Native app", completed: true },
];