import React, { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../AuthContext";
import Loading from "../coponents/Loading";
import BackArrow from "../coponents/BackArrow";

const baseURL = import.meta.env.VITE_BASE_URL;


// Thai to English ingredient translations
const thaiToEnglishIngredients = {
    "ไก่": "chicken",
    "หมู": "pork",
    "เนื้อ": "beef",
    "ปลา": "fish",
    "กุ้ง": "shrimp",
    "ไข่": "egg",
    "ข้าว": "rice",
    "มะเขือเทศ": "tomato",
    "แครอท": "carrot",
    "ผักกาดขาว": "cabbage",
    "พริก": "chili",
    "กระเทียม": "garlic",
    "หอมใหญ่": "onion",
    "ต้นหอม": "spring onion",
    "ผักชี": "cilantro",
    "โหระพา": "basil",
    "ขิง": "ginger",
    "ตะไคร้": "lemongrass",
    "เห็ด": "mushroom",
};


// Fetch fridge items function
async function fetchFridge(id) {
    const response = await fetch(`${baseURL}/fridge/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Network response was not ok (${response.status})`);
    }

    return response.json();
}


function FoodApi() {
    const { user } = useContext(AuthContext);
    const [selectedIngredient, setSelectedIngredient] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_KEY = import.meta.env.VITE_SPOONACULAR;

    // Fetch fridge items using React Query
    const { data: fridgeItems, isLoading: fridgeLoading, isError: fridgeError } = useQuery({
        queryKey: ['fridge'],
        queryFn: () => fetchFridge(user.id),
        enabled: !!user?.id
    });

    // Translate Thai ingredient to English
    const translateIngredient = (thaiIngredient) => {
        // Remove whitespace and convert to lowercase for better matching
        const cleanIngredient = thaiIngredient.trim().toLowerCase();
        
        // Check if there's a direct translation
        for (const [thai, eng] of Object.entries(thaiToEnglishIngredients)) {
            if (cleanIngredient.includes(thai.toLowerCase())) {
                return eng;
            }
        }
        
        // If no translation found, return original text
        return thaiIngredient;
    };
    
    // Fetch Spoonacular API
    const handleSearch = async () => {
        if (!selectedIngredient) return;

        setLoading(true);
        setError(null);
        setRecipes([]);

        try {
            // Translate ingredient to English for API search
            const englishIngredient = translateIngredient(selectedIngredient);
            
            const thaiRes = await fetch(
                `https://api.spoonacular.com/recipes/complexSearch?query=${englishIngredient}&cuisine=Thai&number=5&apiKey=${API_KEY}`
            );
            const thaiData = await thaiRes.json();
            
            if (thaiData.status === "failure") {
                throw new Error(thaiData.message || "API Error");
            }
            
            const thaiResults = thaiData.results || [];

            let allResults = [...thaiResults];

            if (thaiResults.length < 5) {
                const nonThaiRes = await fetch(
                    `https://api.spoonacular.com/recipes/complexSearch?query=${englishIngredient}&number=10&apiKey=${API_KEY}`
                );
                const nonThaiData = await nonThaiRes.json();

                if (nonThaiData.status === "failure") {
                    throw new Error(nonThaiData.message || "API Error");
                }

                const nonThaiUnique = (nonThaiData.results || []).filter(
                    (item) => !thaiResults.some((thai) => thai.id === item.id)
                );

                const needed = 5 - thaiResults.length;
                allResults = [...thaiResults, ...nonThaiUnique.slice(0, needed)];
            }

            const detailedRecipes = await Promise.all(
                allResults.map(async (item) => {
                    const infoRes = await fetch(
                        `https://api.spoonacular.com/recipes/${item.id}/information?apiKey=${API_KEY}`
                    );
                    const infoData = await infoRes.json();
                    
                    if (infoData.status === "failure") {
                        throw new Error(infoData.message || "API Error");
                    }

                    return {
                        title: infoData.title,
                        image: infoData.image,
                        instructions: infoData.instructions || "ไม่มีวิธีทำ",
                        sourceUrl: infoData.sourceUrl,
                        ingredients: infoData.extendedIngredients?.map(ing => ing.original) || [],
                        readyInMinutes: infoData.readyInMinutes,
                        servings: infoData.servings
                    };
                })
            );

            setRecipes(detailedRecipes);
        } catch (err) {
            console.error(err);
            setError("เกิดข้อผิดพลาดในการดึงข้อมูล: " + (err.message || ""));
        } finally {
            setLoading(false);
        }
    };

    if (fridgeLoading) {
        return <Loading />;
    }

    if (fridgeError) {
        return (
            <div className="min-h-screen bg-white-bg w-full flex flex-col items-center justify-center py-[2.5rem] px-[2rem] gap-[3.25rem]">
                <p className="text-red-500">ไม่สามารถโหลดข้อมูลจากตู้เย็นได้</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white-bg w-full flex flex-col items-center py-[2.5rem] px-[2rem] gap-[3.25rem]">
            <BackArrow />
            
            <div className="w-full max-w-3xl">
                <h2 className="text-2xl font-semibold mb-6">ค้นหาเมนูจากวัตถุดิบในตู้เย็น</h2>
                
                {/* Fridge ingredients selection */}
                <div className="mb-8">
                    <h3 className="text-lg mb-3">เลือกวัตถุดิบจากตู้เย็น:</h3>
                    <div className="flex flex-wrap gap-2">
                        {fridgeItems && fridgeItems.length > 0 ? (
                            fridgeItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setSelectedIngredient(item.material)}
                                    className={`px-4 py-2 rounded-full ${
                                        selectedIngredient === item.material
                                            ? "bg-primary text-white"
                                            : "bg-gray-100 hover:bg-gray-200"
                                    }`}
                                >
                                    {item.material}
                                </button>
                            ))
                        ) : (
                            <p className="text-gray-500">ไม่มีวัตถุดิบในตู้เย็น</p>
                        )}
                    </div>
                </div>

                {/* Manual ingredient input */}
                <div className="flex gap-2 mb-8">
                    <input
                        type="text"
                        placeholder="หรือใส่วัตถุดิบเอง เช่น ไก่, กระเทียม"
                        title="สามารถใส่ชื่อวัตถุดิบเป็นภาษาไทยได้"
                        value={selectedIngredient}
                        onChange={(e) => setSelectedIngredient(e.target.value)}
                        className="flex-1 px-4 py-2 border rounded-lg"
                    />
                    <button
                        onClick={handleSearch}
                        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                    >
                        ค้นหา
                    </button>
                </div>

                {/* Loading and error states */}
                {loading && <p className="text-center">กำลังค้นหาสูตรอาหาร...</p>}
                {error && <p className="text-red-500 text-center">{error}</p>}

                {/* Recipe results */}
                <div className="grid gap-8">
                    {recipes.map((recipe, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img
                                src={recipe.image}
                                alt={recipe.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-4">{recipe.title}</h3>
                                
                                {/* Recipe info */}
                                <div className="mb-4 text-gray-600">
                                    <p>เวลาทำ: {recipe.readyInMinutes} นาที</p>
                                    <p>สำหรับ: {recipe.servings} ที่</p>
                                </div>

                                {/* Ingredients */}
                                <div className="mb-4">
                                    <h4 className="font-semibold mb-2">วัตถุดิบ:</h4>
                                    <ul className="list-disc list-inside">
                                        {recipe.ingredients.map((ing, i) => (
                                            <li key={i} className="text-gray-600">{ing}</li>
                                        ))}
                                    </ul>
                                </div>

                             
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FoodApi;
