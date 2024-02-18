import React, { useEffect, useState, useRef } from 'react';
import GameStyleWrapper from './Game.style';

import wassieIdle1 from "./idlespritesnopack.png"
import wassieRun1 from "./runpritesnopack.webp"
import wassieEnd1 from "./endpritesnopack.png";

import { ethers } from 'ethers';

import cABI from "../main/contractABI";

const Game = () => {
    const [laneWidths, setLaneWidths] = useState([]);
    const [startPositions, setStartPositions] = useState([]);
    const [endPositions, setEndPositions] = useState([]);
    const [laneHeights, setLaneHeights] = useState([]);
    const [relativeLaneSizes, setRelativeLaneSizes] = useState([]);
    
    const [raceOdds, setRaceOdds] = useState([]);

    const [startSpeed, setStartSpeed] = useState([]);

    const [raceFinishNumber, setRaceFinishNumber] = useState([]);

    const [vrfNumber1, setVrfNumber1] = useState(0);
    const [vrfNumber2, setVrfNumber2] = useState(0);

    // State to handle user input for raceId
    const [inputRaceId, setInputRaceId] = useState("");
    const [mostRecentRaceId, setMostRecentRaceId] = useState("");
    const [currentResponse, setCurrentResponse] = useState(null);

    const [wssProvider, setWssProvider] = useState(null);

    useEffect(() => {
      let provider;
      try {
        provider = new ethers.providers.WebSocketProvider('wss://rpc.ankr.com/blast_testnet_sepolia/ws/2de5f3009965279a4b85d868cd99d4b034f9e612dac170bfadacefe1d601621a');
      } catch (error) {
        console.log(error);
      }

      setWssProvider(provider);
    }, []);

    const setInitialValues = async (raceId) => {

      const contractAddress = '0xcF29763204aeaB5A0Fd085EEDA90696A1f537F16';
      const contract = new ethers.Contract(contractAddress, cABI, wssProvider);
      try {
        if (raceId >= 1) {
          const vrf1 = await contract.rawVrfList(raceId - 1);
          const vrf2 = await contract.rawVrfList(raceId);

          setVrfNumber1(vrf1); // Storing as string
          setVrfNumber2(vrf2);

        }
      } catch (error) {
        console.error("Error setting initial VRF values:", error);
      }
    };

    useEffect(() => {
      if(wssProvider) {
        const contractAddress = '0xcF29763204aeaB5A0Fd085EEDA90696A1f537F16';
        const contract = new ethers.Contract(contractAddress, cABI, wssProvider);
          
        // Listener for ReceivedUint256
        contract.on("ReceivedUint256", (requestId, response) => {
          setCurrentResponse({ requestId: requestId.toString(), response: response.toString() });  // Update the state with the new response and requestId
        });
          
        return () => {
          contract.removeAllListeners("ReceivedUint256");
        };
      }

    }, [wssProvider]);

    useEffect(() => {
      // Ensure both VRFs are set and not null or undefined
      if (vrfNumber1 && vrfNumber2) {
        calculateOdds();
      }
    }, [vrfNumber1, vrfNumber2]);

    const fetchCurrentRaceId = async () => {
      const contractAddress = '0xcF29763204aeaB5A0Fd085EEDA90696A1f537F16';
      const contract = new ethers.Contract(contractAddress, cABI, wssProvider);
      try {
        const currentRaceId = await contract.raceId();
        setMostRecentRaceId(currentRaceId-1);
        setInputRaceId(currentRaceId-1);
        setInitialValues(currentRaceId.toNumber()-1);
      } catch (error) {
        console.error("Error fetching the current race ID:", error);
      }
    };

    useEffect(() => {
      if(wssProvider) {
        fetchCurrentRaceId();
      }
    }, [currentResponse, wssProvider]);
    
    useEffect(() => {
      // React to user input for a different race ID
      if (inputRaceId) {
        setInitialValues(inputRaceId);
      } else {
        setInitialValues(mostRecentRaceId);
      }
    }, [inputRaceId]);
    

    // State for each horse
    const [horses, setHorses] = useState([
      { id: 1, position: 0, speed: 0, animation: 'run' },
      { id: 2, position: 0, speed: 0, animation: 'run' },
      { id: 3, position: 0, speed: 0, animation: 'run' },
      { id: 4, position: 0, speed: 0, animation: 'run' }
    ]);

    const calculateOdds = () => {
        resetPosition();
        setRaceOdds([0]);
        setRaceFinishNumber([0]);
        setStartSpeed([0]);

        let bnVrf1 = ethers.BigNumber.from(vrfNumber1);
        let bnVrf2 = ethers.BigNumber.from(vrfNumber2);

        // Perform calculations using BigNumber methods
        const horse1Odds = bnVrf1.mod(97).add(10);
        const horse2Odds = bnVrf1.mod(67).add(10);
        const horse3Odds = bnVrf1.mod(47).add(10);
        const horse4Odds = bnVrf1.mod(17).add(10);

        setRaceOdds([horse1Odds.toNumber(), horse2Odds.toNumber(), horse3Odds.toNumber(), horse4Odds.toNumber()]);

        const totalOdds = horse1Odds.add(horse2Odds).add(horse3Odds).add(horse4Odds);
        const raceResult = bnVrf2.mod(totalOdds);

        const horseAMax = horse1Odds.sub(1);
        const horseBMax = horseAMax.add(horse2Odds);
        const horseCMax = horseBMax.add(horse3Odds);

        let result;
        let resultDif;
        if (raceResult.toNumber() <= horseAMax.toNumber()) {
            result = '1';
        } else if (raceResult.toNumber() <= horseBMax.toNumber()) {
            result = '2';
        } else if (raceResult.toNumber() <= horseCMax.toNumber()) {
            result = '3';
        } else {
            result = '4';
        }
        setRaceFinishNumber(result);

        let newStartSpeeds = [];
        for (let i = 1; i <= 4; i++) {
          let speed = 5000;
          const horseIndex = i - 1;
          const relativeSpeed = relativeLaneSizes[horseIndex] / 100; // Check this calculation
          speed *= relativeSpeed;

          newStartSpeeds.push(speed);

        }

        setStartSpeed(newStartSpeeds);
    };

    const tripRock = (id) => {
      const horse = document.getElementById(`horse${id}`);

      horse.style.left = `${parseFloat(horse.style.left)+62}px`;

      horse.className =`horse triprock`; 
    } 

    const moveRightWinner = (id, speed) => {
      const horse = document.getElementById(`horse${id}`);
      horse.style.width = `188px`;

      const laneRect = document.getElementById(`lane${id}`).getBoundingClientRect();

      // Calculate the finish line as 95% of the way from the lane's left to its right
      const finishLine = laneRect.left + (laneRect.width);
      const speedupStartDistance = laneRect.left + (laneRect.width*0.25);
      const speedupEndDistance = laneRect.left + (laneRect.width*0.5);
      const speedupFinish = laneRect.left + (laneRect.width*0.8);

      const animationResult = vrfNumber2 % raceOdds[id-1];

      const moveInterval = 1; // How often to move (ms)
      const moveAmount = speed / 10000; // Adjust this factor to control speed
    
      setTimeout(function() {
        let currentLeft = parseFloat(horse.style.left || '0'); // Get current left or default to 0
        horse.style.left = `${currentLeft + moveAmount}px`;

        // New end condition: Check if the horse has reached the end of the track
        if (currentLeft + horse.offsetWidth >= finishLine) {
          horse.style.backgroundImage = `url(${wassieIdle1})`;
          horse.style.backgroundSize = `3760px 2256px`;
          horse.className= "horse idlealt";
          
        } else {

          if (animationResult <= raceOdds[id-1] * 0.33) {
            horse.style.backgroundImage = `url(${wassieRun1})`;
            horse.style.backgroundSize = `3948px 3948px`;
            horse.className= "horse run";
            speed = startSpeed[id-1]*1.05; 
          } else {

            if ((animationResult > raceOdds[id-1] * 0.33)
            && (animationResult < raceOdds[id-1] * 0.66)
            ) {
              if (currentLeft + horse.offsetWidth >= speedupFinish) {
                horse.style.backgroundImage = `url(${wassieRun1})`;
                horse.style.backgroundSize = `3948px 3948px`;
                horse.className= "horse speedup";
                speed = startSpeed[id-1]*1.25;
              } else {
                horse.style.backgroundImage = `url(${wassieRun1})`;
                horse.style.backgroundSize = `3948px 3948px`;
                horse.className= "horse run";
                speed = startSpeed[id-1];
              }

            }

            if ((currentLeft + horse.offsetWidth >= speedupStartDistance)
            && (currentLeft + horse.offsetWidth <= speedupEndDistance)
            &&(animationResult >= raceOdds[id-1] * 0.66)
            ) {
              horse.style.backgroundImage = `url(${wassieRun1})`;
              horse.style.backgroundSize = `3948px 3948px`;
              horse.className= "horse speedup";
              speed = startSpeed[id-1] *1.25;
            }
  
            if ((currentLeft + horse.offsetWidth >= speedupEndDistance)
            &&(animationResult >= raceOdds[id-1] * 0.66)
            ) {
              horse.style.backgroundImage = `url(${wassieRun1})`;
              horse.style.backgroundSize = `3948px 3948px`;
              horse.className= "horse run";
              speed = startSpeed[id-1]; 
          }
        }
          

            
          moveRightWinner(id, speed);
        }
    
      }, moveInterval );
    }

    const moveRight = (id, speed) => {
      const horse = document.getElementById(`horse${id}`);
      horse.style.width = `188px`;

      const laneRect = document.getElementById(`lane${id}`).getBoundingClientRect();

      // Calculate the finish line as 95% of the way from the lane's left to its right
      const finishLine = laneRect.left + (laneRect.width);

      const lightningDistance = laneRect.left + (laneRect.width*0.75);
      const speedupStartDistance = laneRect.left + (laneRect.width*0.25);
      const speedupEndDistance = laneRect.left + (laneRect.width*0.5);
      const rugpullDistance = laneRect.left + (laneRect.width*0.925);
      const triprockDistance = laneRect.left + (laneRect.width*0.2);

      const animationResult = vrfNumber2 % raceOdds[id-1];

      const moveInterval = 1; // How often to move (ms)
      const moveAmount = speed / 10000; // Adjust this factor to control speed
    
      setTimeout(function() {
        let currentLeft = parseFloat(horse.style.left || '0'); // Get current left or default to 0
        horse.style.left = `${currentLeft + moveAmount}px`;

        // New end condition: Check if the horse has reached the end of the track
        if (currentLeft + horse.offsetWidth >= finishLine) {
          if(horse.className != `horse rugpull`) {
            horse.style.backgroundImage = `url(${wassieEnd1})`;
            horse.style.backgroundSize = `940px 1692px`;
            horse.className= "horse end";
          }

          
        } else {
          
          if ((animationResult < (raceOdds[id-1] * 0.25))  
          && (currentLeft + horse.offsetWidth >= speedupStartDistance)
          && (currentLeft + horse.offsetWidth <= speedupEndDistance)
          ) {
            horse.style.backgroundImage = `url(${wassieRun1})`;
            horse.style.backgroundSize = `3948px 3948px`;
            horse.className= "horse speedup";
            speed = startSpeed[id-1] *1.25;
          }
           
          if ((animationResult < (raceOdds[id-1] * 0.25))  
          && (currentLeft + horse.offsetWidth >= speedupEndDistance)
          ) {
            if((animationResult % 2) == 0 
            && currentLeft + horse.offsetWidth >= lightningDistance) {
              horse.style.backgroundImage = `url(${wassieRun1})`;
              horse.style.backgroundSize = `3948px 3948px`;
              horse.className= "horse lightning";
              speed = startSpeed[id-1] * 0.8;
            } else {
              horse.style.backgroundImage = `url(${wassieRun1})`;
              horse.style.backgroundSize = `3948px 3948px`;
              horse.className= "horse run";
              speed = startSpeed[id-1]*0.94;
            }
          }
            
          if ((animationResult < (raceOdds[id-1] * 0.5))
          && (animationResult >= (raceOdds[id-1] * 0.25)) 
          && currentLeft + horse.offsetWidth >= lightningDistance
          ) { 
            horse.style.backgroundImage = `url(${wassieRun1})`;
            horse.style.backgroundSize = `3948px 3948px`;
            horse.className= "horse lightning";
            speed = startSpeed[id-1] *0.85;

          }

          if ((animationResult < (raceOdds[id-1] * 0.75))
          && (animationResult >= (raceOdds[id-1] * 0.5)) 
          && currentLeft + horse.offsetWidth >= triprockDistance 
          ) { 
            horse.style.backgroundImage = `url(${wassieRun1})`;
            horse.style.backgroundSize = `3948px 3948px`;
            horse.style.width = `250px`;  
            tripRock(id);
            return; 
            
          }
          
          if ((animationResult >= (raceOdds[id-1] * 0.75))
          && currentLeft + horse.offsetWidth < rugpullDistance
          ) { 
            horse.style.backgroundImage = `url(${wassieRun1})`;
            horse.style.backgroundSize = `3948px 3948px`;
            horse.className= "horse run";
            speed = startSpeed[id-1] * 1.2;
          } 

          if ((animationResult >= (raceOdds[id-1] * 0.75))
          && currentLeft + horse.offsetWidth >= rugpullDistance
          ) { 
            horse.style.backgroundImage = `url(${wassieRun1})`;
            horse.style.backgroundSize = `3948px 3948px`;
            horse.className= "horse rugpull";
            speed = startSpeed[id-1] * 0.85;
          } 
 
          moveRight(id, speed);
        }
    
      }, moveInterval );
    }

    const handleStartRace = () => {
      // Ensure all necessary conditions are met (e.g., VRF numbers are set)
      if (raceFinishNumber && relativeLaneSizes.length > 0) {
          startRace(raceFinishNumber);
      }
  };
  

    const startRace = (result) => {
      for (let i = 1; i <= 4; i++) {
        const horse = document.getElementById(`horse${i}`);
        horse.style.backgroundImage = `url(${wassieRun1})`;
        horse.style.backgroundSize = `3948px 3948px`;
        horse.className= "horse run";

        const speed = startSpeed[i-1];

        if(result == i) {

          moveRightWinner(i,speed); 
          
          continue;
        }

        // Now move the horse
        moveRight(i, speed);
      }

    }

    const resetPosition = () => {
      // Constants for sprite dimensions
      const horseWidth = 188; // width of the horse sprite
      const horseHeight = 188; // height of the horse sprite
    
      for (let i = 1; i <= 4; i++) {
        const horse = document.getElementById(`horse${i}`);
        const lane = document.getElementById(`lane${i}`);
        const track = document.querySelector('.track'); // Assuming each lane is within '.track'
        const trackContainer = document.querySelector('.track-container');

        const trackRect = track.getBoundingClientRect();
        const laneRect = lane.getBoundingClientRect();

        const trackContainerRect = trackContainer.getBoundingClientRect();
    
        // Calculate start positions; adjust these calculations based on your track's skew and perspective
        const startLeft = trackContainerRect.width - laneRect.width; // Center the horse in the lane width-wise
        const startTop = laneRect.height - trackContainerRect.height; // Adjust this if necessary
        
        // Applying styles
        horse.style.zIndex = '999';
        horse.style.height = `${horseHeight}px`;
        horse.style.width = `${horseWidth}px`;
        horse.style.left = `${laneRect.left - horseWidth*0.4}px`; // Adjust for track and lane position
        horse.style.top = `${laneRect.top - horseHeight*3/4}px`; // Adjust for track and lane position
        horse.style.filter = `hue-rotate(${(i * 90)}deg)`;
        horse.style.backgroundImage = `url(${wassieIdle1})`;
        horse.style.backgroundSize = `3760px 2256px`; // Maintain sprite sheet dimensions
        horse.className = "horse idle";
      }
    };


    useEffect(() => {
      // Wait for next tick to ensure all elements are rendered
      setTimeout(() => {
        const lanes = document.querySelectorAll('.lane');
        const newLaneWidths = [];
        const newStartPositions = [];
        const newEndPositions = [];
        const newLaneHeights = [];
        const newRelSizes = [];
    
        lanes.forEach(lane => {
          const laneWidth = lane.getBoundingClientRect().width;
          const start = laneWidth;
          const end = laneWidth;
          const laneHeight = lane.getBoundingClientRect().height;
   
          newLaneWidths.push(laneWidth);
          newStartPositions.push(start);
          newEndPositions.push(end);
          newLaneHeights.push(laneHeight);
        });
    
        setLaneWidths(newLaneWidths);
        setStartPositions(newStartPositions);
        setEndPositions(newEndPositions);
        setLaneHeights(newLaneHeights);

        // Calculate the relative sizes of the lanes based on the largest one
        const largestLaneWidth = Math.max(...newLaneWidths);
        const relativeSizes = newLaneWidths.map(width => (width / largestLaneWidth) * 100);

        setRelativeLaneSizes(relativeSizes);    

      }, 0);
    }, []);

  useEffect(() => {
    if (relativeLaneSizes.length > 0) {
      resetPosition();
    }
  }, [relativeLaneSizes]);

  const handleRaceIdInput = (e) => {
    setInputRaceId(e.target.value);
  };

  
  const formatInputNumber = (value) => {
    // Allow the user to finish typing decimals
    if (/^\d*\.?\d*$/.test(value)) {
      return value; // Return as is, user might be typing the decimal part
    }
  
    // For non-numeric inputs, you might want to handle it or return a default value
    return value.replace(/[^0-9.]/g, ''); // Removes anything that's not a digit or a dot
  };

  return (
    <GameStyleWrapper>
      <div className="title-wrapper">      
        <div className="title">Wassie Racing</div>
      </div>

      <div className="main-container">
        <div id="horse1" className="horse end"></div>
        <div id="horse2" className="horse end"></div>
        <div id="horse3" className="horse end"></div>
        <div id="horse4" className="horse end"></div>
        <div className="track-container">
            <div className="track">
              <div className="lane" id="lane1"></div>
              <div className="lane" id="lane2"></div>
              <div className="lane" id="lane3"></div>
              <div className="lane" id="lane4"></div>
              <div id="startline"></div>
              <div id="finishline"></div>
            </div>
            <div className="input-container">
              <div className='recent-race-id'>
                <div className="race-id-title">Latest available race : {mostRecentRaceId}</div>
              </div>
              <div className='race-number-input'>
                <input
                  className='input'
                  type="number"
                  value={formatInputNumber(inputRaceId)}
                  onChange={handleRaceIdInput}
                  placeholder="Race ID"
                />
              </div>
              <div id="start" >
                <button className= "start-button" onClick={handleStartRace}>Replay Race</button>
              </div>

            </div>

        </div>
      </div>
    </GameStyleWrapper>
  );
};

export default Game;