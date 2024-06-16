//server url
//https://visitor-guestbook-7n2o.onrender.com
const form = document.getElementById("visitorSign");

async function fetchAndRenderVisitorForm() {
  const response = await fetch(
    "https://visitor-guestbook-7n2o.onrender.com/user"
  );
  const leftMessages = await response.json();
  console.log(leftMessages);
  const messageDiv = document.getElementById("leftMessages");
  messageDiv.innerHTML = "";

  leftMessages.forEach((msg) => {
    const userMessagesDiv = document.createElement("div");
    userMessagesDiv.id = "inputMessages";
    userMessagesDiv.innerHTML = `Name: ${msg.name} <br> Date: ${msg.date}<br> Message: ${msg.message} <br> <button class="deleteBtn">❌Remove❌</button></p>`;
    messageDiv.appendChild(userMessagesDiv);
  });
  function updateScroll() {
    let element = document.getElementById("leftMessages");
    element.scrollTop = element.scrollHeight;
  }
  updateScroll();
}
fetchAndRenderVisitorForm();

form.addEventListener("submit", submitButton);
async function submitButton(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const formValues = Object.fromEntries(formData);

  try {
    const response = await fetch(
      "https://visitor-guestbook-7n2o.onrender.com/user",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      }
    );

    const data = await response.json();

    if (data.success) {
      console.log("DATA IS SAVED - ALL IS WELL");
      fetchAndRenderVisitorForm();
      form.reset();
      // console.log(formValues);
    } else {
      console.log("NOOO IT DIDN'T WORK!!!!!");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
