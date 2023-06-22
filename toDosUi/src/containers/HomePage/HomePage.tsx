import { PageHolder } from "../../StyledComponents/PageHolder/PageHolder";
import CategoryForm from "../../components/CategoryForm/CategoryForm";
import TaskList from "../TaskList/TaskList";

const HomePage = () => {
    return (
        <PageHolder>
            <CategoryForm />
            <TaskList />
        </PageHolder>
    );
};

export default HomePage;
