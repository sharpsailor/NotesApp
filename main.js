// This will be array which will store all our notes
let notes = [];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", () => {
  let title = document.getElementById("txtHeader").value;
  let content = document.getElementById("txtContent").innerText;
  let currentDate = new Date(),
    month = months[currentDate.getMonth()],
    day = currentDate.getDate(),
    year = currentDate.getFullYear();
  notes.push({
    title: title,
    content: content,
    date: `${month} ${day}, ${year}`,
  });
  document.getElementById("txtHeader").value = "";
  document.getElementById("txtContent").innerText = "";
  showNotes();
});

// rendering notes
function showNotes() {
  const notesDiv = document.getElementById("notesDiv");
  notesDiv.innerHTML = notes
    .map((note, index) => {
      return `
    <div class="note">
        <div class="details">
          <p>${note.title}</p>
          <span>${note.content}</span>
        </div>
      <div class="bottom-content">
          <p>${note.date}</p>
          <div class="bottom-icons">
            <span onclick="updateNote(${index}, '${note.title}', '${note.content}')"><i class="uil uil-pen settings"></i></span>
            <span onclick="deleteNote(${index})"><i class="uil uil-trash settings"></i></span>
            <span onclick="copykarle('${note.content}')"><i class="uil uil-copy settings"></i></span>
          </div>
      </div>
    </div>
          `;
    })
    .join("");
}

function showMenu(elem) {
  elem.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != elem) {
      elem.parentElement.classList.remove("show");
    }
  });
}

function changeStyle(propertyName) {
  // get the textarea
  var txtarea = document.getElementById("txtContent");
  // get the selected text
  let selected = document.getSelection();
  // buttons logic
  switch (propertyName) {
    case "b":
      let boldtext = '<span style="font-weight:bold;">' + selected + "</span>";
      txtarea.innerHTML = txtarea.innerHTML.replace(
        document.getSelection(),
        boldtext
      );
      break;
    case "i":
      let italicText =
        '<span style="font-style: italic;">' + selected + "</span>";
      txtarea.innerHTML = txtarea.innerHTML.replace(
        document.getSelection(),
        italicText
      );
      break;
    case "n":
      let normalText =
        '<span style="font-style: normal; font-weight:normal; text-decoration:none;">' +
        selected +
        "</span>";
      txtarea.innerHTML = txtarea.innerHTML.replace(
        document.getSelection(),
        normalText
      );
      break;
    case "u":
      let underlineText =
        '<span style="text-decoration: underline;">' + selected + "</span>";
      txtarea.innerHTML = txtarea.innerHTML.replace(
        document.getSelection(),
        underlineText
      );
      break;
  }
}
function togglemenu() {
  document.getElementById("sidebar").classList.toggle("active");
}

// Update note
const updateNote = (index, title, content) => {
  document.getElementById("txtHeader").value = title;
  document.getElementById("txtContent").innerText = content;
  document.getElementById("updateBtn").style.display = "inline-block";
  document.getElementById("submitBtn").style.display = "none";
  togglemenu();
  document.getElementById("updateBtn").addEventListener("click", () => {
    notes[index].title = document.getElementById("txtHeader").value;
    notes[index].content = document.getElementById("txtContent").innerText;
    document.getElementById("txtHeader").value = "";
    document.getElementById("txtContent").innerText = "";
    document.getElementById("updateBtn").style.display = "none";
    document.getElementById("submitBtn").style.display = "inline-block";
    showNotes();
  });
};
// Delete note
const deleteNote = (index) => {
  let confirmDel = window.confirm("Are you sure you want to delete this note?");
  if (!confirmDel) return;
  notes.splice(index, 1);
  showNotes();
};

// Copy to clipboard
const copykarle = (content) => {
  navigator.clipboard.writeText(content);
};
