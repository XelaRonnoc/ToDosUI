import "./App.css";
import CategoryProvider from "./context/CategoryProvider";
import HomePage from "./containers/HomePage/HomePage";
import TaskProvider from "./context/TaskProvider";

function App() {
    return (
        <CategoryProvider>
            <TaskProvider>
                <HomePage />
            </TaskProvider>
        </CategoryProvider>
    );
}

export default App;
