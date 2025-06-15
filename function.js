const result = document.getElementById("result");
const btn = document.getElementById("search-btn");
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

btn.addEventListener("click", async () => {
    let inpWord = document.getElementById("inp-word").value;
    try {
        const response = await fetch(`${url}${inpWord}`);
        const data = await response.json();

        if (!data){
            throw ("Word not found");
        }

        const meanings = data[0].meanings[0].definitions[0];
        const partOfSpeech = data[0].meanings[0].partOfSpeech;
        const phonetic = data[0].phonetic;

        result.innerHTML = `
            <div class="word">
                <h3>${inpWord}</h3>
            </div>
            <div class="details">
                <p>${partOfSpeech || "N/A"}</p>
                <p>${phonetic || "N/A"}</p>
            </div>
            <p class="word-meaning">
                ${meanings.definition || "Definition not available"}
            </p>
            <p class="word-example">
                ${meanings.example || ""}
            </p>`;
            
    } 
    catch (error) {
        result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
    }
});

