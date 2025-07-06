if (!localStorage.getItem("activity")) {
  const sample = [];
  const baseDate = new Date("2025-07-02");

  const messages = [
    "Refactored login handler",
    "Fixed typo in README",
    "Updated API response format",
    "Added validation to form",
    "Improved error logging",
    "Optimized database query",
    "Cleaned up unused variables",
    "Renamed confusing function",
    "Converted callback to async/await",
    "Added unit tests for auth",
    "Improved UI responsiveness",
    "Removed deprecated code",
    "Implemented search feature",
    "Fixed bug in pagination logic",
    "Updated dependencies",
    "Improved accessibility for forms",
    "Restructured project folders",
    "Fixed broken link in footer",
    "Documented new API endpoints",
    "Enhanced security for login"
  ];

  for (let i = 0; i < 50; i++) {
    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() + i);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
 
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    const fullMessage = `Commit on ${formattedDate}: ${randomMessage}`;
 
    sample.push({
      id: i + 1,
      message: fullMessage,
      readLater: false,
      favorite: false
    });
  }
  localStorage.setItem("activity", JSON.stringify(sample));
}
 
let currentPage = 1;
const itemsPerPage = 15;
 
function getData() {
  return JSON.parse(localStorage.getItem("activity")) || [];
}
 
function saveData(data) {
  localStorage.setItem("activity", JSON.stringify(data));
}
 
function toggleAction(id, action) {
  const data = getData();
  const item = data.find(d => d.id === id);
  if (item) {
    item[action] = !item[action];
    saveData(data);
    render();
  }
}
 
function searchFilter(item, query) {
  return item.message.toLowerCase().includes(query.toLowerCase());
}
 
function render() {
  const list = document.getElementById("activityList");
  list.innerHTML = "";
 
  const query = document.getElementById("searchInput").value;
  let data = getData().filter(item => searchFilter(item, query));
 
  const totalPages = Math.ceil(data.length / itemsPerPage);
  if (currentPage > totalPages && totalPages !== 0) currentPage = totalPages;
 
  const start = (currentPage - 1) * itemsPerPage;
  const pageData = data.slice(start, start + itemsPerPage);
 
  pageData.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";
 
    card.innerHTML = `
<strong>${item.message}</strong>
<div class="buttons">
<button onclick="toggleAction(${item.id}, 'readLater')" class="${item.readLater ? 'highlight' : ''}">
          ${item.readLater ? "Unmark" : "Read Later"}
</button>
<button onclick="toggleAction(${item.id}, 'favorite')" class="${item.favorite ? 'highlight' : ''}">
          ${item.favorite ? "Unfavourite" : "Favourite"}
</button>
</div>
    `;
    list.appendChild(card);
  });
 
  document.getElementById("pageIndicator").innerText = `Page ${currentPage} of ${totalPages}`;
}
 
function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    render();
  }
}
 
function nextPage() {
  const data = getData().filter(item => searchFilter(item, document.getElementById("searchInput").value));
  const totalPages = Math.ceil(data.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    render();
  }
}
 
document.getElementById("searchInput").addEventListener("input", () => {
  currentPage = 1;
  render();
});
 
render();