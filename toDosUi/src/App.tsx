import "./App.css";
import CategoryProvider from "./context/CategoryProvider";
import HomePage from "./containers/HomePage/HomePage";

function App() {
    return (
        <CategoryProvider>
            <HomePage />
        </CategoryProvider>
    );
}

export default App;
