const getUsers = (e) => {
  e.preventDefault();
  const usersNumber = document.querySelector('[name = "users-number"]').value;
  const userGender = document.querySelector('[name = "gender"]').value;
  const url = `https://randomuser.me/api/?results=${usersNumber}&gender=${
    userGender === "both" ? "male,female" : userGender
  }`;
  fetch(url)
    .then((res) => {
      if (res.status !== 200) {
        throw Error("To nie jest odpowiedź 200");
      } else {
        return res.json();
      }
    })
    .then((json) => showUsers(json.results))
    .catch((err) => console.log(err));
};
const showUsers = (users) => {
  const resultArea = document.querySelector(".user-list");
  resultArea.textContent = "";
  users.forEach((user) => {
    const item = document.createElement("div");
    item.className = "user";
    item.innerHTML = `
    <div class="user__name">${user.name.title.toUpperCase()} ${user.name.first.toUpperCase()} ${user.name.last.toUpperCase()}</div>
    <img class="user__image" src=${user.picture.medium}>
    `;
    resultArea.appendChild(item);
  });
};

document.querySelector(".generator").addEventListener("submit", getUsers);
