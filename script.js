const textarea = document.querySelector("textarea");
btn1 = document.querySelector("button")
languages = document.querySelector("select")

let s =speechSynthesis;
isSpeaking = true;

voices();

function voices(){
    for(let voice of s.getVoices()){
        let selected = voice.name === "Google US English" ? "selected" : "";
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        languages.insertAdjacentHTML("beforeend",option);
    }
}

s.addEventListener("voiceschanged",voices);

function textToSpeech(text){
    let x = new SpeechSynthesisUtterance(text);
    for(let voice of s.getVoices()){
        if(voice.name===languages.value){
            x.voice = voice;
        }
    }
    s.speak(x);
}

btn1.addEventListener("click",e=>{
    e.preventDefault();
    if(textarea.value!==""){
        if(!s.speaking)
            textToSpeech(textarea.value);
    }
    if(textarea.value.length > 80){
        setInterval(()=>{
            if(!s.speaking && !isSpeaking){
                isSpeaking = true;
                btn1.innerText = "Convert To Speech";
            }
        }, 500);
        if(isSpeaking){
            s.resume();
            isSpeaking = false;
            btn1.innerText = "Pause Speech";
        }else{
            s.pause();
            isSpeaking = true;
            btn1.innerText = "Resume Speech";
        }
    }else{
        btn1.innerText = "Convert To Speech";
    }
})