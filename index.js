
document.querySelector("#select-file").onclick = async () => {
  const file = await window.electron.openFile();
  console.log("file",file)
  document.querySelector("img").src = file;
}


// this code send data to mainProcessor
document.getElementById('button').addEventListener('click', () => {
  console.log('Button Clicked');
  window.electron.shareData('Hello from renderer');
});

// this code receive data to mainProcessor
window.electron.ReceiveData((data) => {
  console.log('Received data from main:', data);

  // Example: Updating the DOM with the data
  const displayElement = document.getElementById('data-display');
  if (displayElement) {
    displayElement.textContent = data.message;
  }
});
