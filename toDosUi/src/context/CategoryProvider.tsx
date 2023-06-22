import { createContext, useCallback, useState } from "react";

// add id to categories

export interface partialCategory {
    name: string | undefined;
}

export interface Category {
    id: Number;
    name: string;
}

interface CategoryContextProps {
    addCategory: (newCategory: partialCategory) => void;
    categories: Category[];
}

export const CategoryContext = createContext<CategoryContextProps>({
    addCategory: () => {},
    categories: [],
});

const CategoryProvider: React.FC<any> = ({ children }: any) => {
    const [categories, setCategories] = useState<Category[]>([
        { id: 0, name: "None" },
    ]);

    const addCategory = useCallback(
        (newCategory: partialCategory) => {
            if (newCategory.name) {
                const fullCategory = {
                    name: newCategory.name,
                    id: categories.length,
                };
                setCategories([...categories, fullCategory]);
            }
        },
        [categories]
    );

    return (
        <CategoryContext.Provider value={{ addCategory, categories }}>
            {children}
        </CategoryContext.Provider>
    );
};

export default CategoryProvider;
