const video = document.getElementById("webcam");
const label = document.getElementById("label");
const image = document.getElementById('output')

const labelOneBtn = document.querySelector("#labelOne");
const labelTwoBtn = document.querySelector("#labelTwo");
const labelThreeBtn = document.querySelector("#labelThree");
const trainbtn = document.querySelector("#train");
let inputField = document.querySelector("#inputfield")
let playButton = document.querySelector("#playbutton")
const fileButton = document.querySelector("#file")


labelOneBtn.addEventListener("click", () => console.log("button 1"));
labelTwoBtn.addEventListener("click", () => console.log("button 2"));
labelThreeBtn.addEventListener("click", () => console.log("button 3"));

trainbtn.addEventListener("click", () => console.log("train"));


let synth = window.speechSynthesis

function speak(text) {
    if (synth.speaking) {
        console.log('still speaking...')
        return
    }
    if (text !== '') {
        let utterThis = new SpeechSynthesisUtterance(text)
        synth.speak(utterThis)
    }
}

playButton.addEventListener("click", () => {
    let text = inputField.value
    speak(text)
})


fileButton.addEventListener("change", (event)=>{
    image.src = URL.createObjectURL(event.target.files[0])
})

image.addEventListener('load', () => userImageUploaded())

function userImageUploaded(){
    console.log("The image is now visible in the DOM")
}


classifier.classify(document.getElementById('image'), (err, results) => {
    console.log(results);
});

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((err) => {
            console.log("Something went wrong!");
        });
}

label.innerText = "Ready when you are!";