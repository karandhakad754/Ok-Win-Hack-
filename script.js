const lastFetchedData = {};  // Store last fetched period number per terminal index

// Function to fetch and display prediction
const fetchAndDisplayPrediction = async (typeId, terminalIndex, random, signature) => {
  try {
    const response = await fetch("https://api.bdg88zf.com/api/webapi/GetNoaverageEmerdList", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pageSize: 10,
        pageNo: 1,
        typeId,
        language: 0,
        random,
        signature,
        timestamp: 1732114907
      })
    });

    const { data } = await response.json();

    if (!data || !data.list || data.list.length === 0) {
      displayTypingAnimation("No data available.", terminalIndex, "");
      return;
    }

    const lastItem = data.list[0];
    const periodNumber = lastItem.issueNumber; // Full period number
    

    // Extract last 4 digits for comparison
    const last4Digits = periodNumber.slice(-4);
    const number = parseInt(lastItem.number);
    const result = number >= 5 ? "Big/Green" : "Small/Red";
    const colorWord = (number === 0 || number === 5) ? "Skip" : (number % 2 === 0 ? "Big/Red" : "Small/Green");
    const chance = Math.floor(Math.random() * 51) + 50;  // Random chance of winning (50%-100%)

    // Check and update last fetched data
    if (!lastFetchedData[terminalIndex] || parseInt(last4Digits) >= parseInt(lastFetchedData[terminalIndex])) {
      // Update lastFetchedData with the latest period number
      lastFetchedData[terminalIndex] = parseInt(last4Digits) + 1;
      
      const originalPeriodString = periodNumber;
      const modifiedPeriodString = originalPeriodString.slice(0, originalPeriodString.length - 4) + lastFetchedData[terminalIndex];

      // Display the updated prediction with typing animation
      displayTypingAnimation(
        `DmWin Prediction\nPeriod Number: ${modifiedPeriodString}\nPeriod Result - ${result} (${chance}% chance of winning)`,
        terminalIndex,
        colorWord
      );
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    displayTypingAnimation(`Error fetching data: ${error.message}`, terminalIndex, "");
  }
};

// Function to handle typing animation for predictions
const displayTypingAnimation = (text, terminalIndex, colorWord) => {
  const terminalContent = document.getElementById(`terminal-content-${terminalIndex}`);
  terminalContent.textContent = "";  // Clear previous content
  let index = 0;
  const textLines = text.split("\n");

  const typingInterval = setInterval(() => {
    if (index < textLines.length) {
      const line = textLines[index];
      const lineElement = document.createElement("p");
      let charIndex = 0;

      const lineInterval = setInterval(() => {
        if (charIndex < line.length) {
          lineElement.textContent += line[charIndex];
          charIndex++;
        } else {
          clearInterval(lineInterval);
        }
      }, 50); // Typing speed

      terminalContent.appendChild(lineElement);
      index++;
    } else {
      clearInterval(typingInterval);

      const colorLine = document.createElement("p");
      colorLine.textContent = `Expected colour - ${colorWord}`;
      colorLine.style.color = colorWord;
      terminalContent.appendChild(colorLine);
    }
  }, 150); // Delay between lines
};

// Function to fetch and display data for all terminals
const fetchAndDisplayData = async () => {
  try {
    await Promise.all([
      fetchAndDisplayPrediction(30, 0, "6ea9b7fad3af44b2b26d4cc122725baf", "799E1C888A14AD8B7D3BC46648E95CE0"),
      fetchAndDisplayPrediction(1, 1, "987fa85d0d1244839fefa505254b4bcc", "86E4902B6EF9D65F7569B77F88E80136"),
      fetchAndDisplayPrediction(2, 2, "c74963e17dce442ebe6196a0f46cc873", "E12A08D2C92147DAD2D041CDCA048814"),
      fetchAndDisplayPrediction(3, 3, "8eb8a1dfc471405bb4c868b71eb9f599", "57FF1590896957327A5E2293589D6FD4")
    ]);
  } catch (error) {
    console.error("Error fetching predictions:", error);
  }
};

// Function to start periodic updates for data fetching
const startUpdating = () => {
  setInterval(fetchAndDisplayData, 5000); // Fetch new data every 5 seconds
};

// Initialization
window.onload = () => {
  document.getElementById("alert-dialog").style.display = "flex"; // Show alert dialog
  startUpdating();  // Start fetching and displaying data
};

// Event handlers
document.getElementById("close-dialog").addEventListener("click", () => {
  document.getElementById("alert-dialog").style.display = "none";  // Hide dialog
  fetchAndDisplayData(); // Update the data immediately after closing the dialog
});

document.getElementById("redirect-btn").addEventListener("click", () => {
  window.open("https://elite12345ywywywy.github.io/Ok-win-register/", "_blank");
});

document.getElementById("float-btn-1").addEventListener("click", () => {
  window.open("https://t.me/Team_Hackersz", "_blank");
});

document.getElementById("float-btn-2").addEventListener("click", () => {
  window.open("https://elite12345ywywywy.github.io/Ok-win-register/", "_blank");
});

document.getElementById("float-btn-3").addEventListener("click", () => {
  window.open("https://elite12345ywywywy.github.io/Ok-win-register/", "_blank");
});

