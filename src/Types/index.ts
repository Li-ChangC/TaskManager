export interface ToDo {
    id: string;
    title: string;
    description: string;
    completed: boolean;
}

export type RootStackParamList = {
    TaskListScreen: undefined;
    TaskDetailsScreen: {
        task: ToDo;
        index: number;
        updateTask: (updatedTask: ToDo) => void;
    };
};