class Users {
  constructor(id, name, username, email, website) {
    this.id = id;
    this.name = name;
    this.location = location;
    this.username = username;
    this.email = email;
    this.website = website;
  }
}

class UI {
  static addUserToList(user) {
    const list = document.querySelector("#user-list");
    const listOfIds = Array.from(document.querySelectorAll(".userId"));
    const row = document.createElement("tr");

    let max = 0;

    listOfIds.forEach((el) => {
      if (+el.innerHTML > max) max = +el.innerHTML;
    });

    row.className = "tr";

    row.innerHTML = `
            <td class='userId'>${max + 1}</td>
            <td>${user.name}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.website}</td>
            <td><img src="close.png" class="delete" alt="close"></td>
        `;

    list.appendChild(row);
  }

  static deleteUser(element) {
    if (element.classList.contains("delete")) {
      element.parentElement.parentElement.remove();
      UI.showNotification("User Removed", "success");
    }
  }

  static showUserExtendedInfo(e) {
    if (!e.classList.contains("delete")) {
      const userList = JSON.parse(localStorage.getItem("users"));
      userList.forEach((user) => {
        if (user.name === e.parentElement.children[1].innerHTML) {
          const div = document.createElement("div");
          const imgClose = document.createElement("img");
          imgClose.className = "img-close";
          imgClose.src = "close.png";
          div.appendChild(imgClose);

          imgClose.addEventListener("click", () =>
            document.querySelector(".alert").remove()
          );

          const br = document.createElement("br");
          const br2 = document.createElement("br");
          div.className = `alert neutral`;
          div.appendChild(
            document.createTextNode(`street: ${user.address.street}`)
          );
          div.appendChild(br);
          div.appendChild(
            document.createTextNode(`city: ${user.address.city}`)
          );

          div.appendChild(br2);
          div.appendChild(
            document.createTextNode(`zipcode: ${user.address.zipcode}`)
          );

          const container = document.querySelector(".container");
          const target = e.target;
          container.insertBefore(div, target);
        }
      });
    }
  }

  static showNotification(message, className) {
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#user-form");
    container.insertBefore(div, form);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  static clearFileds() {
    document.querySelector("#name").value = "";
    document.querySelector("#username").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#website").value = "";
  }

  static sortTable(e) {
    var table,
      rows,
      switching,
      i,
      x,
      y,
      shouldSwitch,
      dir,
      index,
      switchcount = 0;
    table = document.getElementById("table");
    switching = true;
    dir = "asc";

    switch (e.target.innerHTML) {
      case "id":
        index = 0;
        break;
      case "name":
        index = 1;
        break;
      case "username":
        index = 2;
        break;
      case "email":
        index = 3;
        break;
      case "website":
        index = 4;
        break;
    }

    while (switching) {
      switching = false;
      rows = table.rows;

      for (i = 1; i < rows.length - 1; i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[index];
        y = rows[i + 1].getElementsByTagName("TD")[index];
        if (dir == "asc") {
          if (
            index
              ? x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()
              : Number(x.innerHTML) > Number(y.innerHTML)
          ) {
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (
            index
              ? x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()
              : Number(x.innerHTML) < Number(y.innerHTML)
          ) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount++;
      } else {
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }
}

document.querySelector("#user-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.querySelector("#name").value;
  const username = document.querySelector("#username").value;
  const email = document.querySelector("#email").value;
  const website = document.querySelector("#website").value;

  if (name === "" || username === "" || email === "" || website === "") {
    const flag = document.querySelector(".alert");
    if (!flag) {
      UI.showNotification("All fields are required!", "danger");
    }
  } else {
    const user = new Users(null, name, username, email, website);

    UI.addUserToList(user);

    const flag = document.querySelector(".alert");
    if (!flag) {
      UI.showNotification("User added", "success");
    }

    UI.clearFileds();
  }
});

document.querySelector("#user-list").addEventListener("click", (e) => {
  const flag = document.querySelector(".alert");
  if (!flag) {
    UI.showUserExtendedInfo(e.target);
  }
  UI.deleteUser(e.target);
});

Array.from(document.querySelectorAll(".sorting-cells")).forEach((cell) => {
  cell.addEventListener("click", (e) => {
    if (cell.classList.contains("headerSortDown")) {
      cell.classList.toggle("headerSortUp");
      cell.classList.remove("headerSortDown");
    } else {
      cell.classList.remove("headerSortUp");
      cell.classList.toggle("headerSortDown");
    }
    UI.sortTable(e);
  });
});
