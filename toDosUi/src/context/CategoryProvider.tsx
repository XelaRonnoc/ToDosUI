import { createContext, useCallback, useState } from "react";

// add id to categories

interface CategoryContextProps {
    addCategory: (newCategory: string) => void;
    categories: string[];
}

export const CategoryContext = createContext<CategoryContextProps>({
    addCategory: () => {},
    categories: [],
});

const CategoryProvider: React.FC<any> = ({ children }: any) => {
    const [categories, setCategories] = useState<string[]>(["None"]);

    const addCategory = useCallback(
        (newCategory: string) => setCategories([...categories, newCategory]),
        [categories]
    );

    return (
        <CategoryContext.Provider value={{ addCategory, categories }}>
            {children}
        </CategoryContext.Provider>
    );
};

export default CategoryProvider;
