// Add session to Firestore
document.getElementById("sessionForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const time = document.getElementById("time").value;
  const duration = document.getElementById("duration").value;
  const instructor = document.getElementById("instructor").value;

  try {
    await db.collection("sessions").add({
      title,
      description,
      time,
      duration,
      instructor
    });

    alert("Session added successfully!");
    document.getElementById("sessionForm").reset();
    loadSessions(); // Refresh session list
  } catch (error) {
    console.error("Error adding session: ", error);
  }
});

// Load all sessions
async function loadSessions() {
  const sessionsList = document.getElementById("sessionsList");
  sessionsList.innerHTML = "";

  const querySnapshot = await db.collection("sessions").orderBy("time").get();

  querySnapshot.forEach((doc) => {
    const session = doc.data();

    const div = document.createElement("div");
    div.className = "session";
    div.innerHTML = `
      <h3>${session.title}</h3>
      <p><strong>Instructor:</strong> ${session.instructor}</p>
      <p><strong>Description:</strong> ${session.description}</p>
      <p><strong>Time:</strong> ${new Date(session.time).toLocaleString()}</p>
      <p><strong>Duration:</strong> ${session.duration} minutes</p>
      <button onclick="enroll('${doc.id}')">Enroll</button>
    `;

    sessionsList.appendChild(div);
  });
}

// Mock enroll function (can be expanded to track users)
async function enroll(sessionId) {
  alert(`You are enrolled in session ID: ${sessionId}`);
  // For advanced features: store enrolled users with Firestore user auth
}

// Load sessions on page load
window.onload = loadSessions;
