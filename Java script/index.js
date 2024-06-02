var urlInput = document.getElementById("bookmarkURL");
var nameInPut = document.getElementById("bookmarkName");
var submit = document.getElementById("submit");
var update = document.getElementById("update");
var deletaAll = document.getElementById("deletaAll");
var container;
var temp;

// check local storage...
if (localStorage.getItem("site") != null) {
  container = JSON.parse(localStorage.getItem("site"));
} else {
  container = [];
}

function addSite() {
  if (validateInputs() == true && nameInPut.value != "") {
    site = {
      name: nameInPut.value,
      url: urlInput.value,
    };
    container.push(site);
    console.log(container);
    localStorage.setItem("site", JSON.stringify(container));
    showData();
    clearData();
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${validateInputs() == false ? "plese enter a valid URL" : ""}
     ${
       nameInPut.value == ""
         ? "Site name must contain at least 3 characters"
         : ""
     }
      `,
      footer: '<a href="#">Why do I have this issue?</a>',
    });
  }
}
//clear data
function clearData() {
  nameInPut.value = null;
  urlInput.value = null;
}

// dispaly for the usyes
function showData() {
  var cartona = "";
  for (var i = 0; i < container.length; i++) {
    cartona += `
      
      <tr class="bg-light border border-bottom-1 border-top-1">
      <td>${i + 1}</td>
      <td>${container[i].name}</td>
      <td>
      <button class="btn btn-success px-4 py-2">
      <a href="${
        container[i].url
      }" target="_blank">   <span class="me-2"><i class="fa-regular fa-eye"></i></span>
     Visit  </a>
    </button>
      </td>
      <td>
        <button onclick="setFormForUpdate(${i})" class="btn btn-primary px-4 py-2">
          <span class="me-2"><i class="fa-solid fa-pen"></i></span
          >update
        </button> 
      </td>
      <td>
        <button onclick="deleteItem(${i})" class="btn btn-danger px-4 py-2">
          <span class="me-2"
            ><i class="fa-solid fa-trash-can"></i
          ></span>
          delete
        </button>
      </td>
    </tr>
      
      `;
  }
  document.getElementById("tbody").innerHTML = cartona;
  var deleteAll = document.getElementById("deletaAll");
  if (container.length > 0) {
    deleteAll.innerHTML = ` <button onclick="deleteAll()"  class="my-3 btn btn-info px-4 py-2 w-100 "> clear all items </button>`;
  } else {
    deleteAll.innerHTML = ` `;
  }
}

//delete one item
function deleteItem(deleteditem) {
  container.splice(deleteditem, 1);
  localStorage.setItem("site", JSON.stringify(container));
  showData();
}

//delete all items
function deleteAll() {
  localStorage.clear();
  container.splice(0);
  showData();
}

// updating process
function setFormForUpdate(i) {
  temp = i;
  submit.classList.add("d-none");
  deletaAll.classList.add("d-none");
  update.classList.remove("d-none");
  nameInPut.value = container[i].name;
  urlInput.value = container[i].url;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

function updateItem() {
  container[temp].name = nameInPut.value;
  container[temp].url = urlInput.value;
  showData();
  localStorage.setItem("site", JSON.stringify(container));

  submit.classList.remove("d-none");
  deletaAll.classList.remove("d-none");
  update.classList.add("d-none");
}
function validateInputs() {
  var regex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;
  // console.log(regex.test(urlInput.value));
  return regex.test(urlInput.value);
}
