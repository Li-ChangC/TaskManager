import React, { useState, useEffect } from "react";
import { View, TextInput } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../Types";
import { RouteProp } from "@react-navigation/native";
import { styles } from "../Styles/styles";

type TaskDetailsScreenRouteProp = RouteProp<RootStackParamList, "TaskDetailsScreen">;

export const TaskDetailsScreen: React.FC = () => {
  const route = useRoute<TaskDetailsScreenRouteProp>();
  const { task, updateTask } = route.params;
  
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const navigation = useNavigation();

  const handleSave = () => {
    updateTask({ ...task, title, description });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      handleSave();
    });

    return unsubscribe;
  }, [title, description]);

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