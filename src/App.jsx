import { useState } from 'react'
import './App.css'
import Box from './component/Box'
import imgRock from './assets/img/img-rock.png'
import imgScissors from './assets/img/img-scissors.png'
import imgPaper from './assets/img/img-paper.png'

//1. 박스 2개(타이틀, 사진, 결과)
//2. 가위바위보 버튼
//3. 버튼을 클릭하면 클릭한 값이 박스에 보임
//4. 컴퓨터는 랜덤하게 아이템 선택이 된다
//5. 3,4번의 결과를 가지고 누가 이겼는지 승패를 따진다
//6. 승패 결과에 따라 테두리 색이 바뀐다(이기면-초록, 지면-빨강, 비기면-검은색)

function App() {
  const [userSelect, setUserSelect] = useState(null)
  const [computerSelect, setComputerSelect] = useState(null)
  const [result, setResult] = useState("")
  const [computerResult, setComputerResult] = useState("")
  const [history, setHistory] = useState([])

  const play = (userChoice) => {
    setUserSelect(choice[userChoice])

    let computerChoice = randomChoice()
    setComputerSelect(computerChoice)

    let userResult = judgement(choice[userChoice], computerChoice)
    setResult(userResult)
    setComputerResult(getComputerResult(userResult))

    setHistory((prev) => [...prev, userResult])
  }

  const judgement = (user, computer) => {
    if (user.id === computer.id) return "tie"
    else if (user.id === "rock") return computer.id === "scissors" ? "win" : "lose"
    else if (user.id === "scissors") return computer.id === "paper" ? "win" : "lose"
    else if (user.id === "paper") return computer.id === "rock" ? "win" : "lose"
  }

  const getComputerResult = (result) => {
    if (result === "win") return "lose"
    else if (result === "lose") return "win"
    else return "tie"
  }

  const randomChoice = () => {
    let itemArray = Object.keys(choice)   //객체에 키값만 뽑아서 어레이로 만들어주는 함수다
    let randomItem = Math.floor(Math.random() * itemArray.length);
    let final = itemArray[randomItem]
    return choice[final]
  }

  const choice = {
    rock: {
      name: "Rock",
      img: imgRock,
      id: "rock"
    },
    scissors: {
      name: "Scissors",
      img: imgScissors,
      id: "scissors"
    },
    paper: {
      name: "Paper",
      img: imgPaper,
      id: "paper"
    }
  }
  return (
    <div className="main">
      <div className='box-container'>
        <Box title="YOU" item={userSelect} result={result} />
        <Box title="COMPUTER" item={computerSelect} result={computerResult} />
      </div>

      <div className='button-box'>
        <button onClick={() => play("scissors")}>가위</button>
        <button onClick={() => play("rock")}>바위</button>
        <button onClick={() => play("paper")}>보</button>
      </div>

      <div className='history-box'>
        <h3>History (USER 기준)</h3>
        {history.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>

    </div>
  )
}

export default App
