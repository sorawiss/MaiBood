import React, { useState } from "react";

function ThaiFoodApi() {
    const [ingredient, setIngredient] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_KEY = "Your API Here";

    const handleSearch = async () => {
        if (!ingredient) return;

        setLoading(true);
        setError(null);
        setRecipes([]);

        try {
            const thaiRes = await fetch(
                `https://api.spoonacular.com/recipes/complexSearch?query=${ingredient}&cuisine=Thai&number=5&apiKey=${API_KEY}`
            );
            const thaiData = await thaiRes.json();
            const thaiResults = thaiData.results || [];

            let allResults = [...thaiResults];

            if (thaiResults.length < 5) {
                const nonThaiRes = await fetch(
                    `https://api.spoonacular.com/recipes/complexSearch?query=${ingredient}&number=10&apiKey=${API_KEY}`
                );
                const nonThaiData = await nonThaiRes.json();

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
                    return {
                        title: infoData.title,
                        image: infoData.image,
                        instructions: infoData.instructions || "ไม่มีวิธีทำ",
                        sourceUrl: infoData.sourceUrl,
                    };
                })
            );

            setRecipes(detailedRecipes);
        } catch (err) {
            console.error(err);
            setError("เกิดข้อผิดพลาดในการดึงข้อมูล");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>ค้นหาเมนูจากวัตถุดิบ</h2>
            <input
                type="text"
                placeholder="ใส่วัตถุดิบ เช่น chicken, basil"
                title="กรุณาใส่เป็นภาษาอังกฤษ เช่น chicken, basil, garlic"
                value={ingredient}
                onChange={(e) => setIngredient(e.target.value)}
                style={{ padding: "8px", width: "300px", marginRight: "10px" }}
            />
            <button onClick={handleSearch}>ค้นหา</button>

            {loading && <p>กำลังโหลด...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <ul>
                {recipes.map((recipe, index) => (
                    <li key={index} style={{ marginBottom: "30px" }}>
                        <h3>{recipe.title}</h3>
                        <img src={recipe.image} alt={recipe.title} width="200" />
                        <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
                        <p>
                            <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">
                                ดูสูตรต้นฉบับ
                            </a>
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ThaiFoodApi;
