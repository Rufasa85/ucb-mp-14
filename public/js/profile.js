document.querySelector("#add-proj-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const projObj = {
    name: document.querySelector("#proj-name").value,
    neededFunding: document.querySelector("#proj-funding").value,
    description: document.querySelector("#proj-desc").value,
  };
  fetch("/api/projects", {
    method: "POST",
    body: JSON.stringify(projObj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      location.reload();
    } else {
      alert("trumpet sound");
    }
  });
});

document.querySelectorAll(".del-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const idToDel = btn.getAttribute("data-id");
    fetch(`/api/projects/${idToDel}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        location.reload();
      } else {
        alert("trumpet sound");
      }
    });
  });
});
