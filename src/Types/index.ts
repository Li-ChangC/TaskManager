export interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
}

export type RootStackParamList = {
    TaskListScreen: undefined;
    TaskDetailsScreen: {
        task: Task;
        updateTask: (updatedTask: Task) => void;
    };
};