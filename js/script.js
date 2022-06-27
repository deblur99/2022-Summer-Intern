const URL = "https://5khnfk9hv7.execute-api.us-west-1.amazonaws.com/dev";
const httpRequest = new XMLHttpRequest();

function setInitWidthImgView() {
  const imgView = document.getElementById("picture");
  imgView.style.width = "auto";
  imgView.style.height = "40rem";
}

function scaleImgViewOnWindowSize() {
  function parseInt(number) {
    return number * 1;
  }

  const containerView = document.getElementById("flex-container");
  const imgView = document.getElementById("picture");

  window.addEventListener("resize", () => {
    if (parseInt(containerView.clientWidth) < parseInt(imgView.clientWidth)) {
      imgView.style.width = "100%";
      imgView.style.height = "100%";
    } else {
      imgView.style.width = "auto";
      imgView.style.height = "40rem";
    }
  });
}

function onClickImportBtn() {
  sendGetImgRequest();
}

function sendGetImgRequest() {
  let imgSrc = "";

  httpRequest.onreadystatechange = alertContents;
  httpRequest.open("GET", URL, false);
  httpRequest.send();

  function alertContents() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        const rawData = JSON.parse(httpRequest.responseText).body;
        imgSrc = JSON.parse(rawData).Items[0].imgsrc;
        console.log(`Request ${httpRequest.status} OK`);
      } else {
        console.log(`${httpRequest.status} Response error`);
      }
    }
  }

  return showImgOnDocument(imgSrc);
}

function showImgOnDocument(imgSrc) {
  if (imgSrc in [undefined, "", null]) {
    console.log("Error: img not found");
    return null;
  }

  const imgView = document.getElementById("picture");
  imgView.src = imgSrc;
}

function onClickExportBtn() {
  getImgFileFromUser();
}

function getImgFileFromUser() {
  let imgSrc = "";
  const fileInput = document.getElementById("browse");

  fileInput.addEventListener("change", (e) => {
    const selectedFile = [...fileInput.files];
    const fileReader = new FileReader();

    fileReader.readAsDataURL(selectedFile[0]);

    fileReader.onload = () => {
      imgSrc = fileReader.result;
      console.log("called " + imgSrc + "\n");
      return sendPostImgRequest(imgSrc);
    };
  });

  fileInput.click();

  console.log("called" + imgSrc + "\n");
}

function sendPostImgRequest(imgSrc) {
  if (imgSrc in [undefined, "", null]) {
    console.log("File not found");
    return null;
  }

  const sendData = {
    user: "user",
    imgsrc: imgSrc,
  };

  httpRequest.onreadystatechange = alertContents;
  httpRequest.open("POST", URL, false);
  httpRequest.send(JSON.stringify(sendData));

  function alertContents() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        console.log(`Request ${httpRequest.status} OK`);
      } else {
        console.log(`${httpRequest.status} Response error`);
      }
    }
  }
}

function main() {
  setInitWidthImgView();
  scaleImgViewOnWindowSize();
}

main();
