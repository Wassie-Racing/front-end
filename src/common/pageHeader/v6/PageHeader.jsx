import PageHeaderStyleWrapper from './PageHeader.style';

import React, { useEffect, useState } from 'react';

import { Web3Button } from "@web3modal/react";
import { Web3NetworkSwitch } from '@web3modal/react';
import { EthereumClient, w3mConnectors } from '@web3modal/ethereum';


import Portal from '../../../components/section/Portal.js';

import altlogo from "../../../assets/images/altlogo2.webp";
import bg2 from "../../../assets/images/bg2.webp"

import { useAccount, createConfig, useNetwork } from 'wagmi';
import { Web3Modal } from '@web3modal/react';
import { ethers } from 'ethers';
import fABI from "./flipABI";
import tABI from "./tokenABI";

import cABI from "./contractABI";

import gif from "./croppedGif.gif";
import gif2 from "./idleCropped.gif";

import cBall from "./croppedBall.gif";

import oLightning from "./optimisedLightning.gif";

import Chat from '../../../components/section/chat/Chat';


import blastSep from '../../../components/section/main/blastSepolia.js';
import blastLogoYellow from "../../../assets/images/blast_logo.png";

const chainImages = {
  168587773: blastLogoYellow
};

const themeVariables = {
  '--w3m-font-family': 'Patrick Hand',
  '--w3m-accent-color': '#a86bff',
  '--w3m-logo-image-url' : altlogo,
  '--w3m-background-image-url' : bg2,
  '--w3m-overlay-backdrop-filter' : 'blur(5px)'
};

const PageHeader = () => {
  const [totalHouseBalance, setTotalHouseBalance] = useState("0"); // State to store total house balance

  const contractAddress = '0xcF29763204aeaB5A0Fd085EEDA90696A1f537F16';

  const currencyAddresses = {
    WETH: '0x4200000000000000000000000000000000000023',
    USDB: '0x4200000000000000000000000000000000000022'
  };

  const currencyNames = Object.entries(currencyAddresses).reduce((acc, [name, address]) => {
    acc[address.toLowerCase()] = name; // Use lower case for consistent address comparison
    return acc;
  }, {});

  const [currencyAddress, setCurrencyAddress] = useState(currencyAddresses['WETH']); // Default or initial currency address
  const [isMobileMenu, setMobileMenu] = useState(false);

  const [currency, setCurrency] = useState('WETH');
  const [betAmount, setBetAmount] = useState('');
  
  // List of currencies or tokens
  const currencies = ['WETH', 'USDB']; // Add your desired currencies here

  const [showDropdown, setShowDropdown] = useState(false); // Control dropdown visibility

  const [chains, setChains] = useState(null);
  const [projectId, setProjectId] = useState(null);
  const [ethereumClient, setEthereumClient] = useState(null);
  const [wagmiClient, setWagmiClient] = useState(null);
  const [provider, setProvider] = useState(null);
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const flipAddress = '0x435fc850cFBC14A5086Ac6cea993975b3aA4EaFA';
  const [contract, setContract] = useState(null);
  
  const [wssProvider, setWssProvider] = useState(null);

  // Function to handle currency change
  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
    setCurrencyAddress(currencyAddresses[newCurrency]);
    setShowDropdown(false); // Hide dropdown after selection
  };


  useEffect(() => {
    let provider;

    if(contractAddress && cABI) {
      try {
        provider = new ethers.providers.WebSocketProvider('wss://rpc.ankr.com/blast_testnet_sepolia/ws/2de5f3009965279a4b85d868cd99d4b034f9e612dac170bfadacefe1d601621a');

      } catch (error) {
        console.log(error);
      }
      setWssProvider(provider);

    }

  }, [contractAddress, cABI]);


  useEffect(() => {
    let contract;
    if(wssProvider) {
      try {
        contract = new ethers.Contract(contractAddress, cABI, wssProvider);
      } catch (error) {
        console.log(error);
      }
      setContract(contract);
    }

  }, [wssProvider]);

  
  // Function to fetch and update the total house balance
  const updateTotalHouseBalance = async () => {
    try {
        if (ethers.utils.isAddress(currencyAddress)) {
            // Call the housePools function with the current currencyAddress
            const pool = await contract.housePools(currencyAddress);
            let balance = pool.totalBalance;

            // Ensure balance is a BigNumber for accurate arithmetic operations
            balance = ethers.BigNumber.from(balance);

            // Subtract 1 from the balance if it's greater than 0
            if (balance.gt(0)) { // gt(0) checks if balance is greater than 0
                balance = balance.sub(1); // sub(1) subtracts 1 from the balance
            }

            // Convert balance from wei to Ether and format to 2 decimal places
            const formattedBalance = parseFloat(ethers.utils.formatUnits(balance, 'ether')).toFixed(3);

            // Update state with the formatted balance
            setTotalHouseBalance(formattedBalance);
        } else {
            setTotalHouseBalance(parseFloat(0).toFixed(2));
            console.error("Invalid Ethereum address:", currencyAddress);
            // Handle invalid address format appropriately
        }
    } catch (error) {
        setTotalHouseBalance(parseFloat(0).toFixed(2));
        console.error("Error fetching total house balance:", error);
    }
  };

  useEffect(() => {
    if(contract) {
      updateTotalHouseBalance();
    }
    console.log("currency address :", currencyAddress);
  
    // Re-fetch the total balance whenever the currencyAddress changes
  }, [currencyAddress, contract]);

  useEffect(() => {
    let provider;
    if(window.ethereum) {
      provider = new ethers.providers.Web3Provider(window.ethereum);

    } else {
      provider = new ethers.providers.WebSocketProvider('wss://rpc.ankr.com/blast_testnet_sepolia/ws/2de5f3009965279a4b85d868cd99d4b034f9e612dac170bfadacefe1d601621a');

    }
    setProvider(provider);
   let wagmiClient;
   if(projectId && chains && blastSep) {
    try {
      wagmiClient = createConfig({
        autoConnect: true,
        connectors: w3mConnectors({ projectId, version: 1, chains }),
        provider,
        defaultChain: blastSep
      })
    } catch (error) {
      console.log(error);
    }
    setWagmiClient(wagmiClient);
   }
 

  }, [projectId, chains, blastSep]);



  useEffect(() => {

    let ethClient;
    if(wagmiClient && chains) {
      try {
        ethClient = new EthereumClient(wagmiClient, chains);

      } catch (error) {
        console.log(error);
      }
      setEthereumClient(ethClient);
    }

  }, [wagmiClient, chains]);

  useEffect(() => {
    if(!projectId) {
      const pId = process.env.REACT_APP_NEXT_PUBLIC_PROJECT_ID;
      setProjectId(pId);
    }
  }, []);

  useEffect(() => {
    if(!chains) {
      const chainsList = [blastSep];
      setChains(chainsList);
    }
  }, []);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStripe, setSelectedStripe] = useState(null);

  const [flipCheckingAllowance, setFlipCheckingAllowance] = useState(false);
  const [flipAwaitingApproval, setFlipAwaitingApproval] = useState(false);
  const [isFlipBetting, setIsFlipBetting] = useState(false);

  const [flipBetAmount, setFlipBetAmount] = useState('');
  const [winAmount, setWinAmount] = useState("");

  const [winner, setWinner] = useState(null);
  const [winningNumber, setWinningNumber] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const [userChoice, setUserChoice] = useState(null);

  const [resultMessage, setResultMessage] = useState('');
  const [resultClass, setResultClass] = useState('');

  const [riskAcceptable, setRiskAcceptable] = useState(false);

  const checkNetwork = () => {
    if(!isConnected) {
      return false;
    }
    console.log("checking chain id:", chain.id);

    if(chain?.id === 168587773) {
      return true;
    } else {
      return false;
    }
  }  

  const handleColorSelect = (color) => {
    if(!isFlipBetting) {
      setIsFlipped(false);
      setWinner(null);
      const boxes = document.querySelectorAll(".box");
      boxes.forEach(box => {
        box.style.opacity = ""; 
      });
    }
    setSelectedColor(color);
  };
  const handleStripeSelect = (stripe) => {
    if(!isFlipBetting) {
      setIsFlipped(false);
      setWinner(null);
      const boxes = document.querySelectorAll(".box");
      boxes.forEach(box => {
        box.style.opacity = ""; 
      });
    }
    setSelectedStripe(stripe);
  };

  const handleBetAmountChange = (event) => {
    setFlipBetAmount(event.target.value);
    
  };

  useEffect(() => {
    calculateWinningAmount(flipBetAmount,selectedColor,selectedStripe);
  }
  ,[selectedColor, selectedStripe, flipBetAmount]);

  const isBoxHighlighted = (color, stripe) => {
    const colorMatch = selectedColor === color || selectedColor === null;
    const stripeMatch = selectedStripe === stripe || selectedStripe === null;
    if(selectedColor === null && selectedStripe === null) {
      return false;
    }
    return colorMatch && stripeMatch;
  };

  // Function to handle the event listening and processing
  const listenForBetResult = (flipContract, requestId) => {
    return new Promise((resolve, reject) => {
      flipContract.on('ReceivedUint256', (emittedRequestId, qrngUint256) => {
        if(emittedRequestId === requestId) {
          flipContract.removeAllListeners('ReceivedUint256'); // Remove the listener to avoid memory leaks
          determineWinner(qrngUint256); // Implement this function based on your logic
  
          resolve(); // Resolve the promise when the event is received and processed
        }
      });
    });
  };

  const displayUserChoice = async () => {
    console.log("displayed user choice :", userChoice);
  }

  const handleFlipBet = async () => {
    if(!checkNetwork()) {return;};
    // Convert the input amount to wei
    const amountInWei = ethers.utils.parseUnits(flipBetAmount.toString(), 'ether');
  
    try {
      // Setup the provider and signer
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Check and potentially approve token allowance for deposit
      await checkAndApproveAllowanceForFlip(signer, amountInWei);
  

      const flipContract = new ethers.Contract(flipAddress, fABI, signer);

      setIsFlipBetting(true);

      let pattern;
      let colour;

      if(selectedColor === 'red') {
        colour = 0;
      } else if (selectedColor === 'yellow') {
        colour = 1;
      } else if (selectedColor === 'blue') {
        colour = 2;
      } else {
        colour = 3;
      }

      if(selectedStripe === 'striped') {
        pattern = 0;
      } else if (selectedStripe === 'solid') {
        pattern = 1;
      } else {
        pattern = 2;
      }

      if(pattern === 0 && colour === 0) {
        setUserChoice([2]);
      }
      if(pattern === 0 && colour === 1) {
        setUserChoice([4]);
      }
      if(pattern === 0 && colour === 2) {
        setUserChoice([6]);
      }

      if(pattern === 1 && colour === 0) {
        setUserChoice([1]);
      }
      if(pattern === 1 && colour === 1) {
        setUserChoice([3]);
      }
      if(pattern === 1 && colour === 2) {
        setUserChoice([5]);
      }

      if(pattern === 2 && colour === 0) {
        setUserChoice([1,2]);
      }
      if(pattern === 2 && colour === 1) {
        setUserChoice([3,4]);
      }
      if(pattern === 2 && colour === 2) {
        setUserChoice([5,6]);
      }

      if(pattern === 0 && colour === 3) {
        setUserChoice([2,4,6]);
      }
      if(pattern === 1 && colour === 3) {
        setUserChoice([1,3,5]);
      }

      console.log("user choice before tx:", userChoice);
      console.log("colour :", colour, "pattern :", pattern);
      const transaction = await flipContract.betFlip(currencyAddress, amountInWei, colour, pattern);
      const receipt = await transaction.wait();  // Wait for the transaction to be mined

      // Find the BetPlaced event in the transaction receipt
      const betPlacedEvent = receipt.events.find(e => e.event === "BetPlaced");
      const requestId = betPlacedEvent.args.requestId;

      console.log("colour : ", colour, "pattern : ", pattern);
      console.log("user choice :", userChoice);
      // Wait for the bet result
      await listenForBetResult(flipContract, requestId);

      setIsFlipBetting(false);

    } catch (error) {
      console.error('Error placing bet:', error);
    }
  };

  const checkAndApproveAllowanceForFlip = async (signer, amountInWei) => {
    // Assuming setIsCheckingAllowance and setIsAwaitingApproval are defined in your component
  
    setFlipCheckingAllowance(true);

    const tokenContract = new ethers.Contract(currencyAddress, tABI, signer); // Make sure tokenABI is defined and correct
  
    // Check current allowance
    const userAddress = await signer.getAddress();
    const allowance = await tokenContract.allowance(userAddress, contractAddress);
    if (allowance.lt(amountInWei)) { // lt is "less than"
      setFlipCheckingAllowance(false);
      setFlipAwaitingApproval(true);
  
      // Not enough allowance, need to approve
      const approveTx = await tokenContract.approve(contractAddress, amountInWei);
      await approveTx.wait(); // Wait for the approval transaction to be mined
      setFlipAwaitingApproval(false);
    } else {
      setFlipCheckingAllowance(false);
    }
  };

  
  const determineWinner = (qrngUint256) => {
    let vrf = ethers.BigNumber.from(qrngUint256);

    const winner = parseInt(vrf.mod(6).add(1));

    setWinner(winner);
   
  };


  const triggerFlip = (winner) => {
    // let newWinningValue;
    // if(winner === 0) {
    //   newWinningValue = Math.floor(Math.random() * 6) + 1;
    //   setUserChoice([1,3,5]);
    // } else {
    //   newWinningValue = winner;
    // }
    // setWinner(newWinningValue);
    setWinningNumber(winner);
    setIsFlipped(true); // Trigger the flip

    const boxes = document.querySelectorAll(".box");
    boxes.forEach(box => {
      box.style.opacity = `100%`;
    });
  };

  const resetFlip = () => {
    setWinningNumber(null);
    setIsFlipped(false);
    setSelectedColor(null);
    setSelectedStripe(null);
    setWinner(null);
    setUserChoice([]);
    const boxes = document.querySelectorAll(".box");
    boxes.forEach(box => {
      box.style.opacity = ""; 
    });
  };

  function calculateWinningAmount(flipBetAmount, selectedColor, selectedStripe) {
    let odds;
    if (selectedColor && !selectedStripe) {
      odds = 3;
    } else if (!selectedColor && selectedStripe) {
      odds = 2;
    } else if (selectedColor && selectedStripe) {
      odds = 6;
    } else {
      odds = 1;
    }
  
    const winningAmount = flipBetAmount * odds * 0.95;

    const win = winningAmount.toPrecision(7);

    setWinAmount(win);

  }

  useEffect(() => {
    if(winAmount > (totalHouseBalance/100)) {
      setRiskAcceptable(false);
    } else {
      setRiskAcceptable(true);
    }
    console.log("risk acceptable : ", riskAcceptable);
    console.log("win amount : ", winAmount);
    console.log("colour : ", selectedColor);
    console.log("stripe : ", selectedStripe);
    console.log("currency : ", currency);
    console.log("currency address: ", currencyAddress);
  }
  ,[winAmount, selectedColor, selectedStripe]);

  useEffect(() => {
    if(winner && userChoice) {
      triggerFlip(winner);

    // Check if the winner is in the userChoice array
    if (userChoice.includes(winner)) {
      setResultMessage('LFW!');
      setResultClass('win');
    } else {
      setResultMessage('Rugged...');
      setResultClass('lose');
    }
  }
  }
  ,[userChoice, winner]);

  return (
    <PageHeaderStyleWrapper>
      <div className="overlay"></div>
      <div className='header'>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/highlow">HiLo</a></li>
            <li><a href="https://docs.wassieracing.com/">Game Details</a></li>
            <li><Web3Button variant="mint" className="connect_btn" icon="show" label="Connect Wallet" /></li>
            <div className="switchNet">
                <Web3NetworkSwitch />
            </div>
          </ul>
        </nav>
        <Portal>
          {ethereumClient && projectId && chainImages && themeVariables
          && <Web3Modal projectId={projectId} ethereumClient={ethereumClient} chainImages={chainImages} themeVariables={themeVariables}/>
          }
        </Portal>
        
      </div>
      <div className ="chat-box">
        <Chat/>
      </div>

        <section className="flip-modal-main">
          <div className='flip-modal-inner'>
            <div style={{ textAlign: 'center' }}> {/* Center aligns all items */}
              <img className='logo' src={altlogo}/>
              <div className="modal-button-container">
              <div className="selection-buttons">
                <div className="selection"></div>
                <div 
                  className="selection" 
                  onClick={() => {
                    handleColorSelect('red');
                    handleStripeSelect(null);
                  }}
                >
                  RED
                </div>
                <div 
                  className="selection" 
                  onClick={() => {
                    handleColorSelect('blue');
                    handleStripeSelect(null);
                  }}
                >
                  BLUE
                </div>
                <div 
                  className="selection" 
                  onClick={() => {
                    handleColorSelect('yellow');
                    handleStripeSelect(null);
                  }}
                >
                  YELLOW
                </div>

              </div>
                <div className="game">
                  <div className="box-container">
                    <div 
                      className="select-pattern" 
                      onClick={() => {
                        handleStripeSelect('solid')
                        handleColorSelect(null)
                        }}>SOLID</div>
                    <div 
                      className={`box solid ${isBoxHighlighted('red', 'solid') ? 'highlighted' : ''}`}
                      onClick={() => {
                          handleStripeSelect('solid');
                          handleColorSelect('red');
                      }}
                    >
                      <div className="container">
                        <div className={`card ${isFlipped ? 'flipped' : ''}`} data-value={1}>
                          <div className='front'>
                            <img className="red-gif" src={isBoxHighlighted('red', 'solid')? gif: gif2}></img>
                          </div>
                          <div className='back'>
                            <img className="red-gif" src={winningNumber === 1 ? cBall : oLightning}></img>
                          </div>
                        </div>
                      </div>
                    
                      
                    </div>
                    <div 
                      className={`box solid ${isBoxHighlighted('blue', 'solid') ? 'highlighted' : ''}`}
                      onClick={() => {
                          handleStripeSelect('solid');
                          handleColorSelect('blue');
                      }}                    
                    >
                      <div className="container">
                        <div className={`card ${isFlipped ? 'flipped' : ''}`} data-value={5}>
                          <div className='front'>
                            <img className="blue-gif" src={isBoxHighlighted('blue', 'solid') ? gif : gif2}/>
                          </div>
                          <div className='back'>
                            <img className="blue-gif" src={winningNumber === 5 ? cBall : oLightning} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div 
                      className={`box solid ${isBoxHighlighted('yellow', 'solid') ? 'highlighted' : ''}`}
                      onClick={() => {
                          handleStripeSelect('solid');
                          handleColorSelect('yellow');
                      }}                    
                    >
                      <div className="container">
                        <div className={`card ${isFlipped ? 'flipped' : ''}`} data-value={3}>
                          <div className='front'>
                            {/* Assuming gif and gif2 are defined and represent different states or images */}
                            <img className="yellow-gif" src={isBoxHighlighted('yellow', 'solid') ? gif : gif2} />
                          </div>
                          <div className='back'>
                            {/* Assuming cBall and ctLightning are defined and represent the images for winning states */}
                            <img className="yellow-gif" src={winningNumber === 3 ? cBall : oLightning}  />
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="box-container">
                    <div 
                      className="select-pattern striped" 
                      onClick={() => {
                        handleStripeSelect('striped')
                        handleColorSelect(null)
                        }}>STRIPED</div>
                    <div 
                      className={`box striped ${isBoxHighlighted('red', 'striped') ? 'highlighted' : ''}`}
                      onClick={() => {
                          handleStripeSelect('striped');
                          handleColorSelect('red');
                      }}                    
                    >
                      <div className="container">
                        <div className={`card ${isFlipped ? 'flipped' : ''}`} data-value={2}>
                          <div className='front'>
                            <img className="red-gif" src={isBoxHighlighted('red', 'striped') ? gif : gif2}/>
                          </div>
                          <div className='back'>
                            <img className="red-gif" src={winningNumber === 2 ? cBall : oLightning}/>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div 
                      className={`box striped ${isBoxHighlighted('blue', 'striped') ? 'highlighted' : ''}`}
                      onClick={() => {
                          handleStripeSelect('striped');
                          handleColorSelect('blue');
                      }}                    
                    >
                      <div className="container">
                        <div className={`card ${isFlipped ? 'flipped' : ''}`} data-value={6}>
                          <div className='front'>
                            <img className="blue-gif" src={isBoxHighlighted('blue', 'striped') ? gif : gif2}/>
                          </div>
                          <div className='back'>
                            <img className="blue-gif" src={winningNumber === 6 ? cBall : oLightning}/>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div 
                      className={`box striped ${isBoxHighlighted('yellow', 'striped') ? 'highlighted' : ''}`}
                      onClick={() => {
                          handleStripeSelect('striped');
                          handleColorSelect('yellow');
                      }}
                    >
                      <div className="container">
                        <div className={`card ${isFlipped ? 'flipped' : ''}`} data-value={4}>
                          <div className='front'>
                            <img className="yellow-gif" src={isBoxHighlighted('yellow', 'striped') ? gif : gif2}/>
                          </div>
                          <div className='back'>
                            <img className="yellow-gif" src={winningNumber === 4 ? cBall : oLightning}/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='input-box-container'>
                  <input
                    className='input-box'
                    type="number"
                    placeholder="Enter Bet"
                    value={flipBetAmount}
                    onChange={handleBetAmountChange}
                  />
                  <div className='dropdown-container'>
                    <button className="select-currency-button" onClick={() => setShowDropdown(!showDropdown)}>
                    <span>{currency}▼</span> {/* Dropdown icon */}</button>
                    {showDropdown && (
                      <div className="currency-dropdown">
                        {currencies.map((c) => (
                          <div key={c} onClick={() => handleCurrencyChange(c)}>
                            {c}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <button 
                  className="place-bet-button"
                  disabled={flipCheckingAllowance || flipAwaitingApproval || isFlipBetting || !riskAcceptable}
                  onClick={handleFlipBet}
                >Place Bet</button>
                <div className='bet-summary'>
                  {flipBetAmount && (selectedColor || selectedStripe) ? (
                    `Bet Amount: ${flipBetAmount} ${currency} on ${selectedColor || ''} ${selectedStripe ? selectedStripe : ''} to win ${winAmount} ${currency}`
                  ) : (
                    "Select an option and input wager"
                  )}
                </div>
              </div>
            </div>
            {/* <button className='bet-history' onClick={() => triggerFlip(0)}>History</button>
            <button className='reset' onClick={resetFlip}>Reset</button> */}
            {isFlipBetting && <div className={`result-message-left pending`}>betting...</div>}
            {isFlipBetting && <div className={`result-message-right pending`}>betting...</div>}
            {winner && <div className={`result-message-left ${resultClass}`}>{resultMessage}</div>}
            {winner && <div className={`result-message-right ${resultClass}`}>{resultMessage}</div>}
          </div>
        </section>

    </PageHeaderStyleWrapper>
  );
};

export default PageHeader;
