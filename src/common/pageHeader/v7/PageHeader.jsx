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
import hlABI from "./highLowABI";

import twoCard from "../../../assets/images/cards/2ofWassie.webp";
import threeCard from "../../../assets/images/cards/3ofWassie.webp";
import fourCard from "../../../assets/images/cards/4ofWassie.webp";
import fiveCard from "../../../assets/images/cards/5ofWassie.webp";
import sixCard from "../../../assets/images/cards/6ofWassie.webp";
import sevenCard from "../../../assets/images/cards/7ofWassie.webp";
import eightCard from "../../../assets/images/cards/8ofWassie.webp";
import nineCard from "../../../assets/images/cards/9ofWassie.webp";
import tenCard from "../../../assets/images/cards/10ofWassie.webp";
import aceCard from "../../../assets/images/cards/AofWassie.webp";
import jackCard from "../../../assets/images/cards/JofWassie.webp";
import queenCard from "../../../assets/images/cards/QofWassie.webp";
import kingCard from "../../../assets/images/cards/KofWassie.webp";

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
  const [currency, setCurrency] = useState('WETH');
  
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
  const highLowAddress = '0x611eE58b08f92EDd5EDC201e3741D33A648eFaDA';
  const [contract, setContract] = useState(null);
  
  const [wssProvider, setWssProvider] = useState(null);

  
  const [highLowCheckingAllowance, setHighLowCheckingAllowance] = useState(false);
  const [highLowAwaitingApproval, setHighLowAwaitingApproval] = useState(false);
  const [isHighLowBetting, setIsHighLowBetting] = useState(false);

  const [highLowBetAmount, setHighLowBetAmount] = useState('');

  const [drawBetDisabled, setDrawBetDisabled] = useState(true);
  const [hiLoBetDisabled, setHiLoBetDisabled] = useState(true);

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

      function calculateBetRiskAcceptable() {

      const drawOdds = 11.73;
      const hiloOdds = 1.95;

      if((highLowBetAmount * drawOdds) > (totalHouseBalance / 100)) {
        setDrawBetDisabled(true);
      } else {
        setDrawBetDisabled(false);
      }

      if((highLowBetAmount * hiloOdds) > (totalHouseBalance / 100)) {
        setHiLoBetDisabled(true);
      } else {
        setHiLoBetDisabled(false);
      }
      console.log("bet :", highLowBetAmount);
      console.log("house :", totalHouseBalance);
    }

    useEffect(() => {
      calculateBetRiskAcceptable();
    }
    ,[highLowBetAmount]);

    const cardMap = {
      1: aceCard,
      2: twoCard,
      3: threeCard,
      4: fourCard,
      5: fiveCard,
      6: sixCard,
      7: sevenCard,
      8: eightCard,
      9: nineCard,
      10: tenCard,
      11: jackCard,
      12: queenCard,
      13: kingCard,
    };

    const handleBetAmountChange = (event) => {
      setHighLowBetAmount(event.target.value);
    };

    // Function to handle the event listening and processing
    const listenForBetResult = (hlContract, requestId) => {
      return new Promise((resolve, reject) => {
        hlContract.on('ReceivedUint256', (emittedRequestId, qrngUint256) => {
          if(emittedRequestId === requestId) {
            hlContract.removeAllListeners('ReceivedUint256'); // Remove the listener to avoid memory leaks
            determineWinner(qrngUint256); // Implement this function based on your logic
    
            resolve(); // Resolve the promise when the event is received and processed
          }
        });
      });
    };

    const determineWinner = (qrngUint256) => {
      let vrf = ethers.BigNumber.from(qrngUint256);

      const winner = parseInt(vrf.mod(13).add(1));

      setWinner(winner);
    };

    const handleHighLowBet = async (choice) => {
      setWinner(null);
      setIsFlipped(false);
      if(!checkNetwork()) {return;};
      // Convert the input amount to wei
      const amountInWei = ethers.utils.parseUnits(highLowBetAmount.toString(), 'ether');

      let choiceNum;
      if(choice === 'High') {
        choiceNum = 0;
      } else if (choice === 'Low') {
        choiceNum = 1;
      } else {
        choiceNum = 2;
      }

      try {
        // Setup the provider and signer
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
  
        // Check and potentially approve token allowance for deposit
        await checkAndApproveAllowanceForHiLo(signer, amountInWei);
        const hlContract = new ethers.Contract(highLowAddress, hlABI, signer);
        setIsHighLowBetting(true);

        const transaction = await hlContract.placeBet(currencyAddress, amountInWei, choiceNum);

        setUserChoice(choiceNum);

        const receipt = await transaction.wait();  // Wait for the transaction to be mined
        // Find the BetPlaced event in the transaction receipt
        const betPlacedEvent = receipt.events.find(e => e.event === "BetPlaced");
        const requestId = betPlacedEvent.args.requestId;
        // Wait for the bet result
        await listenForBetResult(hlContract, requestId);

        setIsHighLowBetting(false);

      } catch (error) {
        console.error('Error placing bet:', error);
      }
    };

    const checkAndApproveAllowanceForHiLo = async (signer, amountInWei) => {
      setHighLowCheckingAllowance(true);
      const tokenContract = new ethers.Contract(currencyAddress, tABI, signer);
      // Check current allowance
      const userAddress = await signer.getAddress();
      const allowance = await tokenContract.allowance(userAddress, contractAddress);
      if (allowance.lt(amountInWei)) {
        setHighLowCheckingAllowance(false);
        setHighLowAwaitingApproval(true);
        const approveTx = await tokenContract.approve(contractAddress, amountInWei);
        await approveTx.wait();
        setHighLowAwaitingApproval(false);
      } else {
        setHighLowCheckingAllowance(false);
      }
    };

    useEffect(() => {
      if(winner) {
        triggerFlip(winner);
      }

      if(userChoice === 0) {
        if(winner > 7) {
          setResultMessage('LFW!');
          setResultClass('win');
        } else {
          setResultMessage('Rugged...');
          setResultClass('lose');
        }
      } else if (userChoice === 1) {
        if(winner < 7) {
          setResultMessage('LFW!');
          setResultClass('win');
        } else {
          setResultMessage('Rugged...');
          setResultClass('lose');
        }
      } else {
        if(winner === 7) {
          setResultMessage('LFW!');
          setResultClass('win');
        } else {
          setResultMessage('Rugged...');
          setResultClass('lose');
        }
      }

    }
    ,[winner]);
  
    const triggerFlip = (winner) => {
      let newWinningValue;
      if(winner === 0) {
        newWinningValue = Math.floor(Math.random() * 13) + 1;
      } else {
        newWinningValue = winner;
      }
      setWinningNumber(newWinningValue);
      setWinner(newWinningValue);
      setIsFlipped(true);
    };
  
    const resetFlip = () => {
      setWinningNumber(null);
      setIsFlipped(false);
      setWinner(null);
    };

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

  useEffect(() => {
    calculateWinningAmount(flipBetAmount,selectedColor,selectedStripe);
  }
  ,[selectedColor, selectedStripe, flipBetAmount]);


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
    if (userChoice == winner) {
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
            <li><a href="/flip">Flip</a></li>
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

      <section className="hl-modal-main">
          <div className='hl-modal-inner'>
            <div style={{ textAlign: 'center' }}>
              <img className='logo' src={altlogo}/>
              <div className="modal-button-container">
                <div className="game">
                  <div className='container'>
                    <div className={`card ${isFlipped ? 'flipped' : ''}`}>
                      <div className='front'>
                        <img className="playing-card" src={sevenCard}></img>
                      </div>
                      <div className='back'>
                        <img className="playing-card" src={cardMap[winningNumber] || sevenCard}></img>
                      </div>
                    </div>
                    
                  </div>
                  
                </div>
                <div className='input-box-container'>                
                  <input
                    className='input-box'
                    type="number"
                    placeholder="Enter Bet"
                    value={highLowBetAmount}
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
                <div className='buttons-container'>
                  <button 
                    className="bet-button"
                    disabled={highLowCheckingAllowance || highLowAwaitingApproval || isHighLowBetting || hiLoBetDisabled}
                    onClick={() => handleHighLowBet('High')}
                  >High</button>
                  <button 
                    className="bet-button"
                    disabled={highLowCheckingAllowance || highLowAwaitingApproval || isHighLowBetting || hiLoBetDisabled}
                    onClick={() => handleHighLowBet('Low')}
                  >Low</button>
                  <button 
                    className="bet-button"
                    disabled={highLowCheckingAllowance || highLowAwaitingApproval || isHighLowBetting || drawBetDisabled}
                    onClick={() => handleHighLowBet('Draw')}
                  >Draw</button>
                </div>

                <div className='bet-summary'>
                    High or Low pays 1.95x, Draw pays 11.73x <br></br> 7 is always the starting card
                </div>
                {isHighLowBetting && <div className={`result-message-left pending`}>betting...</div>}
                {isHighLowBetting && <div className={`result-message-right pending`}>betting...</div>}
                {winner && <div className={`result-message-left ${resultClass}`}>{resultMessage}</div>}
                {winner && <div className={`result-message-right ${resultClass}`}>{resultMessage}</div>}

              </div>
            </div>
{/* 
            <button className='bet-history' 
                    onClick={() => {
                      triggerFlip(0);
                      setUserChoice(0);
                      }}>History</button>
            <button className='reset' onClick={resetFlip}>Reset</button> */}
          </div>
        </section>

    </PageHeaderStyleWrapper>
  );
};

export default PageHeader;
