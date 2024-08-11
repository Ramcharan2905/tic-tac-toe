let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");
let newBtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let main=document.querySelector("main");

let turn=true; //turn of player 1 (X), turn of player 2 (O)

const winPatterns=[[0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,5,8],[2,4,6],[3,4,5],[6,7,8]];

boxes.forEach((box)=>
{
    box.addEventListener("click",()=>
    {
        if(turn==true)
        {
            box.innerText="X";
            turn=false;
        }
        else
        {
            box.innerText="O";
            turn=true;
        }
        box.disabled=true;
        
        checkTie();
        checkWinner();
    });
});

const checkWinner=()=>
{
    for(let pattern of winPatterns)
    {
        let pos1=boxes[pattern[0]].innerText;
        let pos2=boxes[pattern[1]].innerText;
        let pos3=boxes[pattern[2]].innerText;

        if(pos1!=="" && pos2!=="" && pos3!=="")
        {
            if(pos1===pos2 && pos1===pos3)
            {
                disableBoxes();
                showWinner(pos1);
            }
        }
    }
}

const disableBoxes=()=>
{
    for(let box of boxes)
        box.disabled=true;
}

const enableBoxes=()=>
{
    for(let box of boxes)
    {
        box.disabled=false;
        box.innerText="";
    }
}

const showWinner=(winner)=>
{
    msg.innerText=`Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    main.classList.add("hide");
}

const showTie=()=>
{
    msg.innerText="Game is a Tie";
    msgContainer.classList.remove("hide");
    main.classList.add("hide");
}

const resetGame=()=>
{
    turn=true;
    enableBoxes();
    msgContainer.classList.add("hide");
    main.classList.remove("hide");
}

newBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);

const checkTie=()=>
{
    let allBoxFilled=true;
    for(let box of boxes)
    {
        if(box.innerText==="")
        {
            allBoxFilled=false;
            break;
        }
    }
    if(allBoxFilled && !checkWinner())
        showTie();
}