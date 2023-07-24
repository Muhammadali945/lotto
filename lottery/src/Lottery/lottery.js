class Balls
{
    constructor()
    {
        this.toPickBalls = 6;
        this.numberOfBalls = 59;

        this.num = 0;
        this.winningBalls = [];
        this.stop_and_go = 0;

        this.all_balls = document.querySelectorAll(".win-balls");
    }

    start_the_game()
    {
        this.stop_and_go = setInterval(() =>
        {
            this.pickNumbers();
            this.displayNumbers();
        }, 50);

        // stop after 2 seconds
        setTimeout(() =>
        {
            clearInterval(this.stop_and_go);
        }, 2000);
    }

    pick_1_number(col)
    {

        if (col < this.toPickBalls)
        {
            this.num = Math.floor((Math.random() * this.numberOfBalls) + 1);
        } else
        {
            this.num = Math.floor((Math.random() * this.MAX_STAR) + 1);
        }
        return this.num;
    }

    pickNumbers()
    {

        let col = 0;
        this.winningBalls = [];
        // pick 5 numbers
        while (this.winningBalls.length < this.toPickBalls)
        {

            this.num = this.pick_1_number(col);
            // if num not includes in the array winningBalls
            if (!this.winningBalls.includes(this.num))
            {
                this.winningBalls.push(this.num);
                col++;
            }
        }
        // sort the 5 first numbers
        this.winningBalls.sort((num_1, num_2) => (num_1 - num_2));
    }

    displayNumbers()
    {
        for (let col in this.winningBalls)
        {
            this.all_balls[ col ].innerHTML = this.winningBalls[ col ];
        }
    }

    resetNumbers()
    {
        for (let col in this.winningBalls)
        {
            this.all_balls[ col ].innerHTML = ""
        }
    }

    getWinNumber()
    {
        return this.winningBalls;
    }
}

export { Balls }