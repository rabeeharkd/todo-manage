const listContainer = document.getElementById("list-container");
const inputBox = document.getElementById("input-box");

function addTask() {
    if (inputBox.value === '') {
        alert("Common Sense illa lle , daa hamkee ,Press Add After Writing sth broohh")
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li)


        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span)

    }

    inputBox.value = "";
    saveTask()
}

listContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveTask();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveTask();
    }
});

// ✏️ Add this new event for double-click to edit
listContainer.addEventListener("dblclick", (e) => {
    if (e.target.tagName === "LI") {
        const li = e.target;
        const oldText = li.textContent.replace("×", "").trim();
        const input = document.createElement("input");
        input.type = "text";
        input.value = oldText;
        input.className = "edit-input";
        li.innerHTML = "";
        li.appendChild(input);
        input.focus();

        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                li.innerHTML = input.value + `<span>\u00d7</span>`;
                saveTask();
            }
        });

        input.addEventListener("blur", () => {
            li.innerHTML = input.value + `<span>\u00d7</span>`;
            saveTask();
        });
    }
});

function saveTask() {
    localStorage.setItem("data", listContainer.innerHTML)
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

inputBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
})

inputBox.addEventListener("keydown", (e) => {
    if (e.key === "Shift" || e.key === "0") {
        localStorage.removeItem("data");
        listContainer.innerHTML = "";
    }
})

inputBox.addEventListener("keydown", (e) => { 
    if (e.key === "-") {
        let lastTask = listContainer.lastElementChild;
        if (lastTask){
            lastTask.remove();
            saveTask();
        }
    }
})