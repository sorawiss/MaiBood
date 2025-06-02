import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import BackArrow from "../coponents/BackArrow";
import { mockRecipes } from "../mockData";

function FoodApi() {
  const { user } = useContext(AuthContext);
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!selectedIngredient) return;

    setLoading(true);
    setError(null);
    setRecipes([]);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Filter mock recipes based on selected ingredient
      const filteredRecipes = mockRecipes.filter(recipe => 
        recipe.ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(selectedIngredient.toLowerCase())
        )
      );

      setRecipes(filteredRecipes);
    } catch (err) {
      console.error(err);
      setError("เกิดข้อผิดพลาดในการดึงข้อมูล: " + (err.message || ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white-bg w-full flex flex-col items-center py-[2.5rem] px-[2rem] gap-[3.25rem]">
      <BackArrow />
      
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">ค้นหาสูตรอาหาร</h1>
        
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={selectedIngredient}
            onChange={(e) => setSelectedIngredient(e.target.value)}
            placeholder="พิมพ์ชื่อวัตถุดิบ..."
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="px-4 py-2 bg-aceent text-primary rounded disabled:opacity-50"
          >
            {loading ? "กำลังค้นหา..." : "ค้นหา"}
          </button>
        </div>

        {error && (
          <div className="text-red-500 mb-4">{error}</div>
        )}

        <div className="space-y-6">
          {recipes.map((recipe, index) => (
            <div key={index} className="border rounded-lg p-4">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
              <div className="mb-2">
                <span className="font-medium">เวลาในการทำ:</span> {recipe.readyInMinutes} นาที
              </div>
              <div className="mb-2">
                <span className="font-medium">จำนวนที่ทำได้:</span> {recipe.servings} ที่
              </div>
              <div className="mb-4">
                <span className="font-medium">วัตถุดิบ:</span>
                <ul className="list-disc list-inside">
                  {recipe.ingredients.map((ingredient, i) => (
                    <li key={i}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="font-medium">วิธีทำ:</span>
                <p className="whitespace-pre-line">{recipe.instructions}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FoodApi;
