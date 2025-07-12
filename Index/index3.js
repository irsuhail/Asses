function getDomainCount(users) {
  var result = {};

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const domain = user.email.split("@")[1].split(".")[0];

    if (!result[domain]) {
      result[domain] = 1;
    } else {
      result[domain]++;
    }
  }

  return result;
}

function generateUsersTracker(userList) {
  var prefix = "Tracking:";
  let tracker = () => {
    for (let i = 0; i < userList.length; i++) {
      setTimeout(function () {
        console.log(prefix + " " + userList[i].name);
      }, i * 100);
    }
  };
  return tracker;
}

function filterActive(users) {
  return users.filter(user => user.isActive);
}

const usersData = [
  { name: "Riya", email: "riya@gmail.com", isActive: true },
  { name: "Raj", email: "raj@outlook.com", isActive: false },
  { name: "Mona", email: "mona@yahoo.com", isActive: true },
  { name: "Tina", email: "tina@gmail.com", isActive: true },
];

const activeUsers = filterActive(usersData);
const trackerFn = generateUsersTracker(activeUsers);
const domainCounts = getDomainCount(activeUsers);

console.log(domainCounts);


trackerFn();

