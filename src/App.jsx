import { useEffect, useRef, useState } from 'react'

import './App.css'



function App() {

  const canvasRef = useRef(null);
  const btnSortearRef = useRef(null);


  const [winnerIsReady, setWinnerIsReady] = useState(false);
  
  const dataInit = [

    "El Profe", "Pol","Participante 3"

  ]

  //let dataInit = [];

  const [indexWinner, setIndexWinner] = useState(0);


  // const [names, setNames] = useState("");
  // const [winner, setWinner] = useState("");

  const [data, setData] = useState(dataInit);

  // const [angle, setAngle] = useState(0);



  function random_color(){
    let ar_digit=['2','3','4','5','6','7','8','9'];
    let color='';
    let i=0;
    while(i<6){
      let pos=Math.round(Math.random()*(ar_digit.length-1));
      color=color+''+ar_digit[pos];
      i++;
    }
    return '#'+color;
  }


  useEffect(()=>{
    const canvas = canvasRef.current;

    const context = canvas.getContext('2d');

    let center=canvas.width/2;

    //console.log(center);


    context.beginPath();
		context.moveTo(center,center);
		context.arc(center,center,center,0, 2*Math.PI);
		context.lineTo(center,center);
		context.fillStyle ='#33333333';
		context.fill();

		context.beginPath();
		context.moveTo(center,center);
		context.arc(center,center,center-10,0, 2*Math.PI);
		context.lineTo(center,center);
		context.fillStyle ='black';
		context.fill();


    for (var i = 0; i < data.length; i++) {
      //Dibujar las secciones
			context.beginPath();
			context.moveTo(center,center);
			context.arc(center,center,center-20,i*2*Math.PI/data.length, (i+1)*2*Math.PI/data.length);
			context.lineTo(center,center);
			context.fillStyle = random_color();
			context.fill();

      //Escribir los nombres
			context.save();
			context.translate(center, center);
			context.rotate(3*2*Math.PI/(5*data.length)+i*2*Math.PI/data.length);
			context.translate(-center, -center);
			context.font = "13px Comic Sans MS";
			context.textAlign = "right";
			context.fillStyle = "white";
			context.fillText(data[i], canvas.width-30, center);
			context.restore();
		}
  })

  const handleNamesChange = (textareaValue) => {
    //let textareaValue = event.target.value;
    let names = textareaValue;
    let arrayNames = [];
    //names.split(",").map(name => name.trim()).filter(name => name!== ",");
    //names.split("\n").map(name => arrayNames.push(name)).filter(name => name!== "\n");
    names.split(",").map(name => arrayNames.push(name)).filter(name => name!== ",");

    setData(arrayNames);

  };


  let pos_ini=0;
  let clic=0;
  const intervalRef = useRef(null);


  function sortear(e){
    e.preventDefault();

    const canvas = canvasRef.current;
    const btnSortear = btnSortearRef.current;


    if (clic==0) {
      //setWinnerIsReady(false);
      intervalRef.current = setInterval(function(){
        pos_ini-=10;
        canvas.style.transform='rotate('+pos_ini+'deg)';
      },10);
      clic=1;
      btnSortear.innerHTML="Detener";
    }else{
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      clic=0;
      btnSortear.innerHTML="Sortear";



      console.log("clic: "+clic);
      //String Ejm: "rotate(1710deg)"
      let rotationProp = canvas.style.transform;
  
      let angle = rotationProp.replace("rotate(", "").replace("deg)", "");

      angle = Number(angle);
  
      console.log(canvas.style.transform);
      console.log(angle);
  
      let indexCalculated = Math.floor((((angle*-1) % 360)) / (360/data.length)) ;
  
      if(indexCalculated == data.length){
        indexCalculated = 0;
      }
  
      setIndexWinner(indexCalculated);

      console.log("indexCalculated: "+indexCalculated);
      console.log("indexWinner: "+indexWinner);
      console.log(data[indexWinner]);
      setWinnerIsReady(true);

    }

  }

  return (
    <>

      <div className='contenedor'>
        <h1>Concursantes</h1>
        <div className='concursantes'>
          <canvas ref={canvasRef} className='wheel' width="600" height="600"></canvas>

          <div className="mark-winner"></div>

        </div>

        <button ref={btnSortearRef} onClick={sortear} className='btn-sortear'>
            Sortear
        </button>


      </div>

      <div>
        
        <p className='text-winner'>The winner is: {winnerIsReady && (data[indexWinner])} </p>

      </div>

      {/* <textarea onChange={e => handleNamesChange(e.target.value)} name="" id="" defaultValue={"El profe, Pol, Zal, Jenny"}>

      </textarea>
       */}
      <textarea className='ruleta-textarea' onChange={e => {
        handleNamesChange(e.target.value);
  
      }} name="" id="" value={data} placeholder='Inserte nombres separados por comas'>

      </textarea>

    </>
  )
}

export default App
