//server url
//https://visitor-guestbook-7n2o.onrender.com
const form = document.getElementById("visitorSign");

async function fetchAndRenderVisitorForm() {
  const response = await fetch("http://localhost:7430/user");
  const leftMessages = await response.json();
  console.log(leftMessages);
  const messageDiv = document.getElementById("leftMessages");
  messageDiv.innerHTML = "";

  leftMessages.forEach((msg) => {
    const userMessagesDiv = document.createElement("div");
    userMessagesDiv.id = "inputMessages";
    userMessagesDiv.innerHTML = `Name: ${msg.name} <br> Date: ${msg.date}<br> Message: ${msg.message}</p>`;
    messageDiv.appendChild(userMessagesDiv);
  });
}
fetchAndRenderVisitorForm();

form.addEventListener("submit", submitButton);
async function submitButton(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const formValues = Object.fromEntries(formData);

  try {
    const response = await fetch("http://localhost:7430/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });

    const data = await response.json();

    if (data.success) {
      console.log("DATA IS SAVED - ALL IS WELL");
      fetchAndRenderVisitorForm();
      // console.log(formValues);
    } else {
      console.log("NOOO IT DIDN'T WORK!!!!!");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
