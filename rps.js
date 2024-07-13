let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0,
    result: ""
};
/*  or
        if (!score) {
            score = {
                wins: 0,
                losses: 0,
                ties: 0
            };
        }
*/

function pickcmp() {
    let cmp = '';
    const randnum = Math.random();
    if (randnum >= 0 && randnum < 1 / 3)
        cmp = 'rock';
    else if (randnum >= 1 / 3 && randnum < 2 / 3)
        cmp = 'scissors';
    else if (randnum >= 2 / 3 && randnum < 1)
        cmp = 'paper';
    return cmp;
}

function playgame(plyr) {
    const cmp = pickcmp();
    let result = '';
    if (plyr === 'rock') {
        if (cmp === 'rock') {
            result = 'Tie.';
            score.ties += 1;
        }
        else if (cmp === 'paper') {
            result = 'You lose.';
            score.losses += 1;
        } else if (cmp === 'scissors') {
            result = 'You win.';
            score.wins += 1;
        }
    }
    else if (plyr === 'paper') {
        if (cmp === 'paper') {
            result = 'Tie.';
            score.ties += 1;
        } else if (cmp === 'scissors') {
            result = 'You lose.';
            score.losses += 1;
        } else if (cmp === 'rock') {
            result = 'You win.';
            score.wins += 1;
        }
    }
    else if (plyr === 'scissors') {
        if (cmp === 'scissors') {
            result = 'Tie.';
            score.ties += 1;
        } else if (cmp === 'rock') {
            result = 'You lose.';
            score.losses += 1;
        }
        else if (cmp === 'paper') {
            result = 'You win.';
            score.wins += 1;
        }
    }

    localStorage.setItem('score', JSON.stringify(score));

    document.querySelector('.ShowResult')
        .innerHTML = result;

    document.querySelector('.ShowMoves')
        .innerHTML = `You <img src="images/${(plyr)}-emoji.png"> <img src="images/${(cmp)}-emoji.png"> computer`;
    ScoreUpdate();
}

function reset() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    result = "";
    localStorage.removeItem('score');
    ScoreUpdate();
    document.querySelector('.ShowResult')
        .innerHTML = result;
    document.querySelector('.ShowMoves')
        .innerHTML = '';
    document.querySelector('.ShowUpdatedScore')
        .innerHTML = '';
}


document.body.addEventListener('keydown', (event) => {
    if(event.key === 'r') playgame('rock');
    else if(event.key === 'p') playgame('paper');
    else if(event.key === 's') playgame('scissors');
});

document.querySelector('.btn_rock')
    .addEventListener('click', () => {
        playgame('rock');
    });

document.querySelector('.btn_paper')
    .addEventListener('click', () => {
        playgame('paper');
    });

document.querySelector('.btn_scissor')
    .addEventListener('click', () => {
        playgame('scissors');
    });

document.querySelector('.reset')
    .addEventListener('click', () => {
        reset();
    });

document.querySelector('.auto')
    .addEventListener('click', () => {
        autoplay();
    });

let isAutoplaying = false;
let intervalID;

function autoplay() {
    if (document.querySelector('.auto').innerText === 'Auto Play') {
        document.querySelector('.auto').innerText = 'Stop'
    }
    else if (document.querySelector('.auto').innerText === 'Stop') {
        document.querySelector('.auto').innerText = 'Auto Play'
    }

    if (!isAutoplaying) {
        intervalID = setInterval(() => {
            const mov = pickcmp();
            playgame(mov);
            ScoreUpdate();
        }, 1000);
        isAutoplaying = true;
    } else {
        clearInterval(intervalID);
        isAutoplaying = false;
    }
}

function ScoreUpdate() {
    document.querySelector('.ShowUpdatedScore')
        .innerHTML = `Wins: ${(score.wins)}  Losses: ${(score.losses)} Ties: ${(score.ties)}`;
}