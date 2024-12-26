import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TaskItem } from "../Components/TaskItem";
import { ToDo, RootStackParamList } from "../Types";
import { generateUUID } from "../Utils/uuid";
import { mockTasks } from "../MockData/mockTasks";
import { styles } from "../Styles/styles";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "TaskListScreen">;

export const TaskListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [toDoList, setToDos] = useState<ToDo[]>(mockTasks);
  const [value, setValue] = useState<string>("");
  const [error, showError] = useState<boolean>(false);

  const addTask = (): void => {
    if (value.trim()) {
      setToDos([...toDoList, { id: generateUUID(), title: value, description: "", completed: false }]);
      setValue("");
      showError(false);
    } else {
      showError(true);
    }
  };

  const toggleComplete = (index: number): void => {
    setToDos((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (index: number): void => {
    setToDos((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  const updateTask = (updatedTask: ToDo): void => {
    setToDos((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task List</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Add a new task..."
          value={value}
          onChangeText={(text) => {
            setValue(text);
            showError(false);
          }}
          style={styles.inputBox}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      {error && <Text style={styles.error}>Error: Input field cannot be empty!</Text>}
      <FlatList
        data={toDoList}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("TaskDetailsScreen", {
                task: item,
                index,
                updateTask,
              })
            }
          >
            <TaskItem
              task={item}
              onToggle={() => toggleComplete(index)}
              onDelete={() => removeTask(index)}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
