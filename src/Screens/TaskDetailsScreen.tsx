import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../Types";
import { RouteProp } from "@react-navigation/native";
import { styles } from "../Styles/styles"; 

type TaskDetailsScreenRouteProp = RouteProp<RootStackParamList, "TaskDetailsScreen">;

export const TaskDetailsScreen: React.FC = () => {
  const route = useRoute<TaskDetailsScreenRouteProp>();
  const { task, index, updateTask } = route.params;

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSave = () => {
    updateTask({ ...task, title, description });
  };  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.titleInput}
        value={title}
        onChangeText={(text) => {
          setTitle(text);
          handleSave();
        }}
        placeholder="Task Title"
      />
      <TextInput
        style={styles.descriptionInput}
        value={description}
        onChangeText={(text) => {
          setDescription(text);
          handleSave();
        }}
        placeholder="Task Description"
        multiline
      />
    </View>
  );
};