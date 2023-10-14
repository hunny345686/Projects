window.addEventListener('load', init);


const levels ={
	easy: 7,
	medium:5,
	hard:3
}

// const a = document.querySelector('#levels');
// const a = $("#levels option:selected").text();
const currentlevel = levels.easy;

console.log(currentlevel);

let time = currentlevel;
let score = 0;
let isplaying;


const word_input = document.querySelector('#word_input');
const current_word = document.querySelector('#current_word');
const score_display = document.querySelector('#score');
const time_display = document.querySelector('#time');
const massage = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

const words=['beautiful','article','annihilate','procrastination','class','romentic','honest','showing','language','writer','river','rose','prediction','susceptible','morphemes','independent','composed','definitions','pronunciations','etymologies','leading','independent','particular'];


function init()
{
	seconds.innerHTML = currentlevel;
   showwords(words);
   word_input.addEventListener('input',startmatch);
   setInterval(countdown,1000);
   setInterval(checkstatus,50);
}

function startmatch()
{
	if(matchwords())
	{
		isplaying= true;
		time = currentlevel +1;
		showwords(words);
		word_input.value ="";
		score++;
	}
	if(score === -1)
	{
		score_display.innerHTML = 0;
	}else 
	{
		score_display.innerHTML = score;	
	}
	 
}

function matchwords()
{
  if(word_input.value === current_word.innerHTML)	
	  {
	  		massage.innerHTML= "correct!!";
	  		return true;
	  }	else 
	  {
	  	massage.innerHTML ="";
	  	return	false;	
	  }
}

function checkstatus()
{
	if (!isplaying && time === 0) 
	{
		massage.innerHTML ="Game Over!!";
		score = -1;
	}
}


function showwords(words)
{
	const randindex = Math.floor(Math.random()* words.length);
	current_word.innerHTML = words[randindex];
}

function countdown()
{
	if(time > 0)
	{
		time--;
	}else if(time === 0)
	{
		isplaying = false;
	}

	time_display.innerHTML = time;
}