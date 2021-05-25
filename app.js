
const canvas = document.getElementById('js-canvas');
const color = document.getElementsByClassName('jsColor');
const ctx = canvas.getContext("2d");
let painting = false;


//canvas pixel manipulating size
canvas.width = 700;
canvas.height = 700;

//set context default
ctx.lineWidth = 2.5;
ctx.strokeStyle = "#2c2c2c";

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


//페인팅 불값
function startPainting(){
    painting = true;
}

function stopMouseLeave(event){
    painting = false;
}

//html에서 색상 뽑아내기
function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
}

Array.from(color).forEach(colors => 
    colors.addEventListener("click", handleColorClick)
);

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopMouseLeave);
    canvas.addEventListener("mouseleave", stopMouseLeave);
}
