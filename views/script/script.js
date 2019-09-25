function deleteSaler() {
  const id = this.dataset.id;
  const url = "/saler/delete-saler";
  const options = {
    method: "POST",
    body: JSON.stringify({ id }),
    headers: {
      "content-type": "application/json"
    }
  };

  fetch(url, options)
    .then(res => res.json())
    .then(data => {
      switch (data.status) {
        case "ok":
          $("#good-modal").modal("show");
          break;
        default:
          $("#badModal .modal-body p").text("Произошла ошибка");
          $("#badModal").modal("show");
          break;
      }

      this.parentElement.parentElement.remove();
    })
    .catch(err => console.error(err));
}

document.querySelectorAll(".delete-saler").forEach(button => {
  button.addEventListener("click", deleteSaler);
});

document.querySelector("#add-saler").addEventListener("submit", event => {
  event.preventDefault();

  const formData = Object.fromEntries(new FormData(event.target).entries());

  const url = "/saler/new-saler";
  const body = JSON.stringify(formData);
  const options = {
    method: "POST",
    body,
    headers: {
      "content-type": "application/json"
    }
  };

  fetch(url, options)
    .then(res => res.json())
    .then(data => {
      switch (data.status) {
        case "ok":
          $("#addNewSaler").modal("hide");
          $("#good-modal").modal("show");
          const row = document.createElement("div");
          row.className = "row mt-5 border-bottom";

          const pName = document.createElement("p");
          pName.className = "col-md-3 mt-1";
          pName.textContent = formData.name;

          const pSurName = document.createElement("p");
          pSurName.className = "col-md-3 mt-1";
          pSurName.textContent = formData.surname;

          const pLogin = document.createElement("p");
          pLogin.className = "col-md-3 mt-1";
          pLogin.textContent = formData.login;

          const div = document.createElement("div");
          div.className = "col-md-3 mb-3";

          const button = document.createElement("button");
          button.dataset.id = data.id;
          button.className = "btn btn-dark delete-saler";
          button.textContent = "Удалить";
          button.addEventListener("click", deleteSaler);

          div.appendChild(button);
          row.appendChild(pName);
          row.appendChild(pSurName);
          row.appendChild(pLogin);
          row.appendChild(div);

          document.querySelector("#dashboard-container").appendChild(row);
          break;
        default:
          $("#addNewSaler").modal("hide");
          $("#badModal .modal-body p").text(data.msg);
          $("#badModal").modal("show");
          break;
      }
    })
    .catch(err => console.error(err));
});
