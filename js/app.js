const featureExtractor = ml5.featureExtractor('MobileNet', { numLabels: 3 }, modelLoaded);

const goBtn = document.getElementById("goBtn");
const objective = document.getElementById("objective");
const photoTaken = document.getElementById("photoTaken");
const result = document.getElementById("result");
const resultText = document.getElementById("result-text");

let synth = window.speechSynthesis

function speak(text) {
    if (synth.speaking) {
        console.log('still speaking...');
        return;
    }
    if (text !== '') {
        let utterThis = new SpeechSynthesisUtterance(text);
        synth.speak(utterThis);
    }
}

function modelLoaded() {
    console.log('Model Loaded!'); 
    classifier = featureExtractor.classification(photoTaken);
    featureExtractor.load("./model/model.json");
}

function start () {
    goBtn.remove();
    objective.innerText = "laat een air force 1 zien"
    speak("laat een air force 1 zien")
}

function imageUploaded(event) {
    let uploadedImage = document.getElementById("output");
	uploadedImage.src = URL.createObjectURL(event.target.files[0]);

    let uploadedImageHidden = document.getElementById("output-hidden");
	uploadedImageHidden.src = URL.createObjectURL(event.target.files[0]);
    
    classifier.classify(uploadedImageHidden, (err, result) => {
        if (result) {
            if (result[0]['label'] === "Air force 1") {
                speak("Je hebt een air force 1 gevonden")
                resultText.innerText = "Je hebt een air force 1 gevonden"

            } else {
                speak("You've taken a photo of a " + result[0]['label'] + ", try again!")
                resultText.innerText = "You've taken a photo of a " + result[0]['label'] + ", try again!"
            }
        }
    });
}