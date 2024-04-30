function updateFileName() {
    var fileNameElement = document.getElementById("fileName");
    var fileInput = document.getElementById("image");

    if (fileInput.files.length > 0) {
        var fileNames = Array.from(fileInput.files).map(file => file.name).join(', ');
        fileNameElement.textContent = fileNames;
        updateImageCount(fileInput.files.length);
        clearErrorMessage();
    } else {
        fileNameElement.textContent = "Click or Drag to Upload Image";
        updateImageCount(0);
    }
}

function updateImageCount(count) {
    var imageCountElement = document.getElementById("imageCount");

    if (count === 1) {
        imageCountElement.textContent = "1 image added";
    } else if (count > 1) {
        imageCountElement.textContent = count + " images added";
    } else {
        imageCountElement.textContent = "";
    }
}

function validateDate() {
    var currentDate = new Date().toISOString().split("T")[0];
    var selectedDate = document.getElementById("date").value;

    if (selectedDate > currentDate) {
        alert("Please select a date on or before the current date.");
        document.getElementById("date").value = currentDate;
    }
}

function validateForm() {
    var fileInput = document.getElementById("image");
    var errorMessageElement = document.getElementById("errorMessage");

    for (var i = 0; i < fileInput.files.length; i++) {
        var fileType = fileInput.files[i].type;

        if (fileType !== "image/jpeg" && fileType !== "image/jpg" && fileType !== "image/png") {
            errorMessageElement.textContent = "Only JPEG, JPG, and PNG images are allowed.";
            return false;
        }
    }

    clearErrorMessage();
    return true;
}

function clearErrorMessage() {
    document.getElementById("errorMessage").textContent = "";
}