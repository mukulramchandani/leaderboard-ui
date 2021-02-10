import React, { useEffect, useState } from 'react';
import './App.css';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';


function App() {

  const medalsInfo = {
    '1':"Gold",
    '2':"Silver",
    '3':"Bronze"
  }

  const loggedInUser = "mukul.r@example.com";
  const [users, setUsers] = useState(null);

  const [usersRenderInfo, setUsersRenderInfo] = useState(null);

  const [visible, setVisible] = useState(false);


  const [maxScore, setMaxScore] = useState(null);

  const [levelsArray,setLevelsArray] = useState([]);

  const [userScore,setUserScore] = useState(null);

  const [medalId,setMedalId] = useState(null);



  useEffect(() => {
    getData().then(() => {
      console.log("Data Fetched");
    });

    setTimeout(()=>{
      setVisible(true);
    },5000);

  }, []);

  useEffect(() => {
    let usersRenderData = [];
    if (users && maxScore) {
      console.log(users);
      let styleSheet = document.styleSheets[0];
      let u = users.data;
      u.forEach((element, index) => {
        //console.log(element);
        let animationName = `${element.username}`;
        let keyframes =
          `@keyframes ${animationName} {
          100% {offset-distance:${(element.score / maxScore) * 100}%;
      }`;

        styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
       // console.log(styleSheet);
        element["animationName"] = animationName;
        let userData = element;
        usersRenderData.push(userData);

        if(element.email === loggedInUser){
          console.log('user found')
          setUserScore(element.score);
          setMedalId(element.medalId);
        }
      });
      console.log(usersRenderData);

      setUsersRenderInfo(usersRenderData);


    }
    console.log("maxScore/users changed");
  }, [users,maxScore]);

  const getUserLevelInfo = () => {
    let level = '';
    console.log(userScore);
    if(levelsArray && userScore){
      levelsArray.forEach((e,i)=>{
        if(i===0 && userScore <= e){
          level =  "Level 1";
        }else if(i !== 5 && userScore <= e && userScore > levelsArray[i-1] ){
          level =  `Level ${i+1}`;
        }else if( i===5 && userScore > levelsArray[4]){
          level = "Level 6";
        }
      })
    }
    console.log(level,'level');
    return level;
  }

  const getData = async () => {
    const levelsInfo = await (await fetch('http://localhost:8080/api/get-levels-info')).json();
    let levels = [];
    const maxScore = levelsInfo.data[levelsInfo.data.length-1].maxScore;
    for(let i=1;i<=6;i++){
      let levelValue = (maxScore/6)*i;
      levels.push(levelValue);
    }
    setMaxScore(levelsInfo.data[levelsInfo.data.length-1].maxScore);
    const usersData = await (await fetch('http://localhost:8080/api/get-users')).json();
    setUsers(usersData);
    setLevelsArray(levels);
    //console.log(levelsInfo);
    //console.log(usersData);
  }

  return (
    <div className="root">

      <div  className="App-header">
        GAME&nbsp;&nbsp; SUMMARY
      </div>
      <div className="main">
        <div className="leaderboard">
          <div className="leaderboardMain">

            {
              levelsArray.length && levelsArray.map((e,i)=>{
                let className = `level${i+1}text`;
                let levelValue = `${e} ft.`
                return(
                  <>
                  <strong key={i*2} className={className}>{levelValue}</strong>
                  <hr key={""+i+i} className={`level${i+1}`} />
                  </>
                )
              })
            }
            {/* <strong className="level1text">3300 ft.</strong>
            <strong className="level2text">6600 ft.</strong>
            <strong className="level3text">9900 ft.</strong>
            <strong className="level4text">13200 ft.</strong>
            <strong className="level5text">16500 ft.</strong>
            <strong className="level6text">19800 ft.</strong> */}

            {/* <hr className="level1" />
            <hr className="level2" />
            <hr className="level3" />
            <hr className="level4" />
            <hr className="level5" />
            <hr className="level6" /> */}

            <svg className="route" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 563">
              <defs>
                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="white" />
                  <stop offset="100%" stopColor="orange" />
                </linearGradient>
              </defs>
              <path d="M 68 516 L 286 490 C 354 410 321 504 490 532 C 608 373 676 569 931 503 C 845 404 900 342 967 333 C 777 195 827 342 612 246 C 810 257 621 164 767 174 L 698 122" stroke="url(#routeGradient)" strokeWidth="3" fill="none" />
            </svg>
            {usersRenderInfo && usersRenderInfo.map((item, index) => {

              let style = {
                animationName: item.animationName,
                animationDuration: "5000ms",
                animationFillMode: "forwards",
                animationTimingFunction: "ease-in-out",
                cursor: "grab"
              }

              if (item.email === loggedInUser)
                return (
                  <Tippy key={index+index+""} content={<div className="userToolTip"><span><img style={{ borderRadius: "25px", border: "1.7px solid firebrick" }} height={50} width={50} alt={item.username} src={item.image} /></span><span>{item.name}</span><h5 style={{ margin: 0 }}>Score: {item.score}ft</h5></div>}
                  interactive={true}
                  allowHTML={true}
                  visible={visible}
                  >
                    <svg key={"" + index} className="userPin" style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M 13 10 m 0 -5 c -1.657 0 -3 1.343 -3 3 s 1.343 3 3 3 s 3 -1.343 3 -3 s -1.343 -3 -3 -3 m -7 2.602 c 0 -3.517 3.271 -6.602 7 -6.602 s 7 3.085 7 6.602 c 0 3.455 -2.563 7.543 -7 14.527 c -4.489 -7.073 -7 -11.072 -7 -14.527 m 7 -7.602 c -4.198 0 -8 3.403 -8 7.602 c 0 4.198 3.469 9.21 8 16.398 c 4.531 -7.188 8 -12.2 8 -16.398 c 0 -4.199 -3.801 -7.602 -8 -7.602" stroke="darkred" strokeWidth="0.6" fill="darkred" />
                    </svg>
                  </Tippy>

                )
              else
                return (
                  <Tippy key={index+index+""} content={<div className="userToolTip"><span><img style={{ borderRadius: "25px", border: "1.7px solid firebrick" }} height={50} width={50} alt={item.username} src={item.image} /></span><span>{item.name}</span><h5 style={{ margin: 0 }}>Score: {item.score}ft</h5></div>}
                  interactive={true}
                  allowHTML={true}
                  >
                    <svg key={"" + index} className="userPin" style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M 13 10 m 0 -5 c -1.657 0 -3 1.343 -3 3 s 1.343 3 3 3 s 3 -1.343 3 -3 s -1.343 -3 -3 -3 m -7 2.602 c 0 -3.517 3.271 -6.602 7 -6.602 s 7 3.085 7 6.602 c 0 3.455 -2.563 7.543 -7 14.527 c -4.489 -7.073 -7 -11.072 -7 -14.527 m 7 -7.602 c -4.198 0 -8 3.403 -8 7.602 c 0 4.198 3.469 9.21 8 16.398 c 4.531 -7.188 8 -12.2 8 -16.398 c 0 -4.199 -3.801 -7.602 -8 -7.602" stroke="navajowhite" strokeWidth="0.5" fill="navajowhite" />
                    </svg>
                  </Tippy>
                )

            })

            }

          </div>
        </div>
      </div>
      <div className="summary">
            { levelsArray.length && maxScore && userScore && <h4>{getUserLevelInfo()}</h4>}
            {medalId && <h4>{medalsInfo[medalId]}</h4>}
            <h4>Rising</h4>
      </div>
    </div>
  );
}

export default App;
