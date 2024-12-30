import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TaskListScreen } from "./src/Screens/TaskListScreen";
import { TaskDetailsScreen } from "./src/Screens/TaskDetailsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TaskListScreen">
        <Stack.Screen name="TaskListScreen" component={TaskListScreen} options={{ title: "Task List" }} />
        <Stack.Screen name="TaskDetailsScreen" component={TaskDetailsScreen} options={{ title: "Task Details" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}