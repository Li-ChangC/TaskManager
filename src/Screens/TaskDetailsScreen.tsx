import React, { useState, useEffect } from "react";
import { View, TextInput, Button } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../Types";
import { RouteProp } from "@react-navigation/native";
import { styles } from "../Styles/styles";
import { HfInference } from "@huggingface/inference";

const HUGGING_FACE_API_KEY = "your-api-key-here";
const inference = new HfInference(HUGGING_FACE_API_KEY);

type TaskDetailsScreenRouteProp = RouteProp<RootStackParamList, "TaskDetailsScreen">;

export const TaskDetailsScreen: React.FC = () => {
  const route = useRoute<TaskDetailsScreenRouteProp>();
  const { task, updateTask } = route.params;

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [loading, setLoading] = useState(false);

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

  const generateDescription = async () => {
    setLoading(true);
    try {
      const response = await inference.textGeneration({
        model: 'mistralai/Mistral-7B-Instruct-v0.3',
        inputs: `Please generate a possible description for the item in a todo list titled '${title}'.`
      });

    const textParts = response.generated_text.split(/\n\s*\n|\r\n\s*\r\n/); 
    const generatedText = textParts.slice(1).join("\n\n").trim() || "No description generated.";
    setDescription(generatedText);
    } catch (error) {
      console.error("Error generating description:", error);
      setDescription("An error occurred while generating the description.");
    } finally {
      setLoading(false);
    }
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
      <Button
        title={loading ? "✨ Generating..." : "✨ Generate Description"}
        onPress={generateDescription}
        disabled={loading}
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