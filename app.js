
const canvas = document.getElementById('js-canvas');
const color = document.getElementsByClassName('jsColor');
const ctx = canvas.getContext("2d");
const range = document.getElementById('js-range');
const modeBtn = document.getElementById('js-mode');
const saveBtn = document.getElementById('js-save');
let painting = false;
let filling = false;

//canvas pixel manipulating size
const canvasSize = 700;
canvas.height = canvasSize;
canvas.width = canvasSize;

//set context default
const INITIAL_COLOR = "#2c2c2c";
ctx.lineWidth = 2.5;
ctx.fillStyle = "white"
ctx.fillRect(0,0,canvasSize, canvasSize);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;


//캔버스에 마우스 감지후 라인 생성
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function handleRightBtn(event){
    event.preventDefault();
}

//Fill 모드

function handleFilling(){
    if(filling) 
    ctx.fillRect(0,0,canvasSize, canvasSize);
}

// 캔버스 이벤트
if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopMouseLeave);
    canvas.addEventListener("mouseleave", stopMouseLeave);
    canvas.addEventListener("contextmenu", handleRightBtn)
    canvas.addEventListener("click", handleFilling);
}


//페인팅 불값
function startPainting(){
    if(filling === false)
    painting = true;
}

function stopMouseLeave(event){
    painting = false;
}

//html에서 색상 뽑아내기
function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

Array.from(color).forEach(colors => 
    colors.addEventListener("click", handleColorClick)
);


//브러쉬 크기 설정
function handleinput(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

if(range){
    range.addEventListener("input", handleinput);
}

// 모드버튼 만들기 - fILL&PAINT 

function handlemode(){

    if(filling === true){   //fill
        filling = false;
        modeBtn.innerText = "fill";
    }else{                  //brush
        filling = true;
        modeBtn.innerText = "brush";
    }
    
}

if(modeBtn){
    modeBtn.addEventListener("click", handlemode);
}


//save버튼으로 이미지 저장
function handleSave(event){
    const image = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = image;
    link.download = "fromKokiPaint";
    link.click();
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSave)
}
