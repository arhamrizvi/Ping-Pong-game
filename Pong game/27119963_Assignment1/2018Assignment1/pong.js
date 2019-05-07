"use strict";
function pong() {
    const svg = document.getElementById("canvas");
    let cpu = new Elem(svg, 'rect')
        .attr('x', 40).attr('y', 70)
        .attr('width', 12).attr('height', 80)
        .attr('fill', '#fff');
    let comp = Observable.interval(10);
    let d = 1;
    comp.filter(() => Number(cpu.attr('y')) == 600).subscribe(() => d = d * -1);
    comp.filter(() => Number(cpu.attr('y')) == 0).subscribe(() => d = d * +1);
    comp.subscribe(() => cpu.attr('y', Number(ball.attr('y')) + d));
    let lines = new Elem(svg, 'rect')
        .attr('x', 300).attr('y', 0)
        .attr('width', 7).attr('height', 600)
        .attr('fill', '#fff');
    lines.observe;
    let mousemove = Observable.fromEvent(svg, 'mousemove'), mouseup = Observable.fromEvent(svg, 'mouseup'), player = new Elem(svg, 'rect')
        .attr('x', 550).attr('y', 70)
        .attr('width', 12).attr('height', 80)
        .attr('fill', '#fff');
    player.observe('mousemove')
        .map(({ clientY }) => ({ yOffset: Number(player.attr('y')) - clientY }))
        .flatMap(({ yOffset }) => mousemove
        .takeUntil(mouseup)
        .map(({ clientY }) => ({ y: clientY + yOffset })))
        .subscribe(({ y }) => player.attr('y', y));
    let ball = new Elem(svg, 'rect')
        .attr('x', 300).attr('y', 300)
        .attr('width', 12).attr('height', 12)
        .attr('fill', '#fff');
    let cpuScore = new Elem(svg, "text")
        .attr('x', 150).attr('y', 80)
        .attr('fill', '#fff').attr('font-size', 50);
    let score2 = new Elem(svg, "text")
        .attr('x', 450).attr('y', 80)
        .attr('fill', '#fff').attr('font-size', 50);
    let bool = Observable.interval(1);
    let e = 1;
    let f = 0.5;
    let cpuPoints = 0;
    let playerPoints = 0;
    cpuScore.elem.textContent = String(cpuPoints);
    score2.elem.textContent = String(playerPoints);
    bool.filter(() => Number(cpuPoints) === 11).subscribe(() => cpuScore.elem.textContent = "win");
    bool.filter(() => Number(playerPoints) === 11).subscribe(() => score2.elem.textContent = "win");
    bool.filter(() => Number(ball.attr('x')) == 600).subscribe(() => cpuScore.elem.textContent = String(cpuPoints += 1));
    bool.filter(() => Number(ball.attr('x')) == 0).subscribe(() => score2.elem.textContent = String(playerPoints += 1));
    bool.filter(() => Number(ball.attr('x')) == 600).subscribe(() => ball.attr('x', 300).attr('y', 300));
    bool.filter(() => Number(ball.attr('x')) == 0).subscribe(() => ball.attr('x', 300).attr('y', 300));
    bool.filter(() => Number(ball.attr('x')) == 550 && ((Number(ball.attr('y')) >= Number(player.attr('y'))) && (Number(ball.attr('y')) <= Number(player.attr('y')) + Number(player.attr('height'))))).subscribe(() => e = e * -1);
    bool.filter(() => Number(ball.attr('x')) === 40 && ((Number(ball.attr('y')) >= Number(cpu.attr('y'))) && (Number(ball.attr('y')) <= Number(cpu.attr('y')) + Number(cpu.attr('height'))))).subscribe(() => e = e * -1);
    bool.filter(() => Number(cpuPoints) < 11 && Number(playerPoints) < 11).subscribe(() => ball.attr('x', Number(ball.attr('x')) + e));
    bool.filter(() => Number(ball.attr('y')) == 600).subscribe(() => f = f * -1);
    bool.filter(() => Number(ball.attr('y')) == 0).subscribe(() => f = f * -1);
    bool.filter(() => Number(cpuPoints) < 11 && Number(playerPoints) < 11).subscribe(() => ball.attr('y', Number(ball.attr('y')) + f));
}
if (typeof window != 'undefined')
    window.onload = () => {
        pong();
    };
//# sourceMappingURL=pong.js.map