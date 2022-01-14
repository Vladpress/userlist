async function fetchUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const userList = await response.json();
  localStorage.setItem("users", JSON.stringify(userList));
  userList.forEach((user) => {
    const list = document.querySelector("#user-list");
    const row = document.createElement("tr");
    row.className = "tr";
    row.innerHTML = `
    <td class='userId'>${user.id}</td>
    <td>${user.name}</td>
    <td>${user.username}</td>
    <td>${user.email}</td>
    <td>${user.website}</td>
    <td class="del"><img src="close.png" class="delete" alt="close"></td>
    `;
    list.appendChild(row);
  });
}
fetchUsers();
