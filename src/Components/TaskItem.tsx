import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ToDo } from "../Types";
import { styles } from "../Styles/styles";
import Icon from "react-native-vector-icons/MaterialIcons";

interface TaskItemProps {
    task: ToDo;
    onToggle: () => void;
    onDelete: () => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => (
    <View style={styles.listItem}>        
        <TouchableOpacity style={styles.completeButton} onPress={onToggle}>
            <Text style={styles.buttonText}>{task.completed ? (
                <Icon name="check-circle" size={16} />
            ) : (
                <Icon name="radio-button-unchecked" size={16} />
            )}</Text>
        </TouchableOpacity>
        <Text style={[styles.task, { textDecorationLine: task.completed ? "line-through" : "none" }]}>
            {task.title}
        </Text>
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <Text style={[styles.buttonText, styles.deleteButtonText]}>×</Text>
        </TouchableOpacity>
    </View>
);