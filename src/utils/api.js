// utils/api.js

export async function findReaction(reactants) {
  try {
    const res = await fetch("http://localhost:5000/api/reactions/find", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ reactants })
    });

    if (!res.ok) throw new Error("Failed to fetch reaction");

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
}
