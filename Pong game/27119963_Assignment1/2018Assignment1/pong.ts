// FIT2102 2018 Assignment 1
// https://docs.google.com/document/d/1woMAgJVf1oL3M49Q8N3E1ykTuTu5_r28_MQPVS5QIVo/edit?usp=sharing

function pong() {
  // Inside this function you will use the classes and functions 
  // defined in svgelement.ts and observable.ts
  // to add visuals to the svg element in pong.html, animate them, and make them interactive.
  // Study and complete the tasks in basicexamples.ts first to get ideas.

  // You will be marked on your functional programming style
  // as well as the functionality that you implement.
  // Document your code!  
  // Explain which ideas you have used ideas from the lectures to 
  // create reusable, generic functions.

  
  
  //CPU
  const svg = document.getElementById("canvas")!; 
  let
  cpu = new Elem(svg, 'rect')
          .attr('x', 40)    .attr('y', 70)
          .attr('width', 12).attr('height', 80)
          .attr('fill', '#fff');
  

  // making the cpu move 
  let comp = Observable.interval(10)
  let d = 1;
  comp.filter(() => Number(cpu.attr('y')) == 600).subscribe(()=> d = d*-1) //if it touches the bottom
  comp.filter(() => Number(cpu.attr('y')) == 0).subscribe(()=> d = d*+1) //if it touches the top
  comp.subscribe(() => cpu.attr('y',Number(ball.attr('y')) + d))


  //half-way
  //Just makes a white line in the middle
  let lines = new Elem(svg,'rect')
    .attr('x', 300).attr('y', 0)
    .attr('width', 7).attr('height', 600)
    .attr('fill', '#fff');
  lines.observe;

  
  //Player
  let 
  mousemove = Observable.fromEvent<MouseEvent>(svg, 'mousemove'),
  mouseup = Observable.fromEvent<MouseEvent>(svg, 'mouseup'),
  player = new Elem(svg, 'rect')
          .attr('x', 550)    .attr('y', 70)
          .attr('width', 12).attr('height', 80)
          .attr('fill', '#fff');
  player.observe<MouseEvent>('mousemove')
    .map(({clientY}) => ({yOffset: Number(player.attr('y')) - clientY }))
    .flatMap(({yOffset}) =>
      mousemove
        .takeUntil(mouseup)
        .map(({clientY}) => ({y: clientY + yOffset })))
        .subscribe(({y}) =>
          player.attr('y', y));
  


  //ball function
  let ball = new Elem(svg, 'rect') 
    .attr('x', 300).attr('y', 300)
    .attr('width', 12).attr('height', 12)
    .attr('fill', '#fff');

  //The computers score, at the left top corner
  let cpuScore = new Elem(svg, "text")
    .attr('x',150).attr('y',80)
    .attr('fill','#fff').attr('font-size',50)

  //The players score, at the right top corner
  let score2 = new Elem(svg, "text")
    .attr('x',450).attr('y',80)
    .attr('fill','#fff').attr('font-size',50)

  
   
  let bool = Observable.interval(1) //speed of the ball
  //initializations
  let e = 1;
  let f = 0.5;

  let cpuPoints = 0;
  let playerPoints = 0;

  cpuScore.elem.textContent = String(cpuPoints); //to display cpu points
  score2.elem.textContent = String(playerPoints); //to display player points


  bool.filter(() => Number(cpuPoints)===11).subscribe(()=>cpuScore.elem.textContent = "win") //indicate winner for cpu
  bool.filter(() => Number(playerPoints)===11).subscribe(()=>score2.elem.textContent = "win") //indicate winner for player
  bool.filter(() => Number(ball.attr('x')) == 600).subscribe(()=> cpuScore.elem.textContent = String(cpuPoints+=1)) //to display the cpu points
  bool.filter(() => Number(ball.attr('x')) == 0).subscribe(()=> score2.elem.textContent = String(playerPoints+=1)) //to display the player points
  bool.filter(() => Number(ball.attr('x')) == 600).subscribe(()=>ball.attr('x', 300).attr('y', 300)) //if the ball reaches the end of the x-axis, ball goes to initial poistion
  bool.filter(() => Number(ball.attr('x')) == 0).subscribe(()=>ball.attr('x', 300).attr('y', 300)) //if the ball reaches the start of the x-axis, ball goes to initial poistion
  bool.filter(() => Number(ball.attr('x'))==550 && ((Number(ball.attr('y'))>=Number(player.attr('y'))) && (Number(ball.attr('y'))<=Number(player.attr('y'))+Number(player.attr('height'))))).subscribe(()=>e = e*-1) //if it touches the player paddle, bounce back
  bool.filter(() => Number(ball.attr('x'))===40 && ((Number(ball.attr('y'))>=Number(cpu.attr('y'))) && (Number(ball.attr('y'))<=Number(cpu.attr('y'))+Number(cpu.attr('height'))))).subscribe(()=>e = e*-1) //if it touches the cpu paddle, bounce back
  
  bool.filter(() => Number(cpuPoints)<11 && Number(playerPoints)<11).subscribe(() => ball.attr('x',Number(ball.attr('x')) + e)) //keep moving the ball until it reaches 11

  //same functionality as above, for the y-coordinate
  bool.filter(() => Number(ball.attr('y')) == 600).subscribe(()=> f = f*-1)
  bool.filter(() => Number(ball.attr('y')) == 0).subscribe(()=> f = f*-1)
  
  bool.filter(() => Number(cpuPoints)<11 && Number(playerPoints)<11).subscribe(() => ball.attr('y',Number(ball.attr('y')) + f)) //keep moving the ball until it reaches 11

  }


// the following simply runs your pong function on window load.  Make sure to leave it in place.
if (typeof window != 'undefined')
  window.onload = ()=>{
    pong();
  }

 

 