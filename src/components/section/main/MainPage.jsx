import React, { useState, useRef, useEffect, useCallback } from 'react';

import MainPageStyleWrapper from './MainPage.style';
import Chat from '../chat/Chat';
import Game from '../game/Game';

import { Web3Button } from "@web3modal/react";
import { Web3NetworkSwitch } from '@web3modal/react';
import { EthereumClient, w3mConnectors } from '@web3modal/ethereum';

import Lottie from 'react-lottie';

import menu from '../../../assets/lotties/LottieMenuAlt.json';

import { useAccount, createConfig, useNetwork, useSwitchNetwork } from 'wagmi';

import Portal from '../Portal';

import { Web3Modal } from '@web3modal/react';

import Header from '../header/v1';

import './smallsprites.css';

import cABI from "./contractABI";
import tABI from "./tokenABI";

import { ethers } from 'ethers';

import blastSep from './blastSepolia.js';

import blastLogoYellow from "../../../assets/images/blast_logo.png";


import altlogo from "../../../assets/images/altlogo2.webp";
import bg2 from "../../../assets/images/bg2.webp"

import copyIcon from "./copy-solid.svg";
import refreshIcon from "./refresh.svg";

import '../../../common/layout/stylesheet.css';

import { createClient, cacheExchange, fetchExchange } from '@urql/core'

const GRAPH_API_KEY = process.env.REACT_APP_THEGRAPH_API_KEY;

const APIURL = "https://gateway-arbitrum.network.thegraph.com/api/" + GRAPH_API_KEY + "/subgraphs/id/EepVyux1PitCG2Q62vnUtqCBLzLyxJZVWD6WNDKmWHod";


const globalBetsQuery = `
  query {
    betPlaceds(first: 10, orderBy: blockTimestamp, orderDirection: desc) {
      id
      user
      betId
      betAmount
      tokenSelection
      choice
      raceId
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`

const graphClient = createClient({
  url: APIURL,
  exchanges: [cacheExchange, fetchExchange],
});

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

const MainPage = () => {

  const getUserFeedQuery = (userAddress) => `
    query {
      betPlaceds(first: 5, orderBy: blockTimestamp, orderDirection: desc, where: {user: "${userAddress}"}) {
        id
        user
        betId
        betAmount
        tokenSelection
        choice
        raceId
        blockNumber
        blockTimestamp
        transactionHash
      }
    }
  `;

  // const fetchGlobalFeedGraphData = async () => { 
  //   const globalBetsResponse = await graphClient.query(globalBetsQuery).toPromise();
  //   console.log('global feed response:', globalBetsResponse);
  // }

  // const fetchUserBetsGraphData = async (address) => {
  //   const query = getUserFeedQuery(address);
  //   try {
  //     const userBetsResponse = await graphClient.query({ query }).toPromise();
  //     console.log('user bets response:', userBetsResponse);
  
  //     // Process and reverse the list to have the earliest bet at the bottom
  //     const initialUserBets = userBetsResponse.data.betPlaceds.map(bet => ({
  //       betId: bet.betId,
  //       betAmount: ethers.utils.formatEther(bet.betAmount),
  //       tokenSelection: currencyNames[bet.tokenSelection?.toLowerCase()] ?? "Unknown Currency",
  //       choice: bet.choice,
  //       raceId: bet.raceId,
  //       status: "pending" // Assuming you need to set an initial status
  //     })).reverse();
  
  //     setRecentBets(initialUserBets); // Update your state with the fetched bets
  //   } catch (error) {
  //     console.error("Error fetching user bets from The Graph:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchUserBetsGraphData();
  // }, []);

  // useEffect(() => {
  //   fetchGlobalFeedGraphData();
  // }, []);



  const [chains, setChains] = useState(null);
  const [projectId, setProjectId] = useState(null);
  const [ethereumClient, setEthereumClient] = useState(null);
  const [wagmiClient, setWagmiClient] = useState(null);
  const [provider, setProvider] = useState(null);
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();

  const checkNetwork = () => {
    if(!isConnected) {
      return false;
    }

    if(chain?.id === 168587773) {
      return true;
    } else {
      return false;
    }
  } 
  
  const [isPaused, setIsPaused] = useState(true);
  const [direction, setDirection] = useState(1);
  const [currentSegment, setCurrentSegment] = useState('initial'); // New state variable
  const lottieRef = useRef(null);
  const [headerOpen, setHeaderOpen] = useState(false);

  const [odds, setOdds] = useState({ oddsA: "0", oddsB: "0", oddsC: "0", oddsD: "0" });

  // State for user's balance in the current pool
  const [userBalance, setUserBalance] = useState("0");
  
  // Mapping of currency names to addresses
  const currencyAddresses = {
    WETH: '0x4200000000000000000000000000000000000023',
    USDB: '0x4200000000000000000000000000000000000022' 
  };

  const currencyNames = Object.entries(currencyAddresses).reduce((acc, [name, address]) => {
    acc[address.toLowerCase()] = name; // Use lower case for consistent address comparison
    return acc;
  }, {});

  // New states for currency selection
  const [currency, setCurrency] = useState('WETH'); // Default or initial currency
  const [showDropdown, setShowDropdown] = useState(false); // Control dropdown visibility
  const [currencyAddress, setCurrencyAddress] = useState(currencyAddresses['WETH']); // Default or initial currency address
  
  const [totalHouseBalance, setTotalHouseBalance] = useState("0"); // State to store total house balance

  const [referralAmount, setReferralAmount] = useState("0");

  // List of currencies or tokens
  const currencies = ['WETH', 'USDB']; // Add your desired currencies here

  const [betAmount, setBetAmount] = useState("");
  const [betWithinRisk, setBetWithinRisk] = useState("");

  const [vrf1, setVrf1] = useState("");
  const [vrf2, setVrf2] = useState("");

  // State to track the active option
  const [activeOption, setActiveOption] = useState(1);
  const optionLabels = ['A', 'B', 'C', 'D']; // Labels for options

  const [gameStarted, setGameStarted] = useState(0);
  const [endTime, setEndTime] = useState(0);

  const [currentState, setCurrentState] = useState(null);
  const [timeSettled, setTimeSettled] = useState(0);

  // State to store recent bets
  const [recentBets, setRecentBets] = useState([]);

  // State to store recent bets
  const [globalBets, setGlobalBets] = useState([]);

  const [currentRequestId, setCurrentRequestId] = useState(null);
  const [currentResponse, setCurrentResponse] = useState(null);

  const [settledPeriod, setSettledPeriod] = useState(null);
  const [bettingPeriod, setBettingPeriod] = useState(null);

  const [referralAddress, setReferralAddress] = useState("");
  
  const [isCheckingAllowance, setIsCheckingAllowance] = useState(false);
  const [isAwaitingApproval, setIsAwaitingApproval] = useState(false);
  const [isPlacingBet, setIsPlacingBet] = useState(false);

  const [tokenBalance, setTokenBalance] = useState("Fetching...");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isMinigamesModalOpen, setIsMinigamesModalOpen] = useState(false);

  const [wssProvider, setWssProvider] = useState(null);
  const [contract, setContract] = useState(null);

  const contractAddress = '0xcF29763204aeaB5A0Fd085EEDA90696A1f537F16';
  
  const account = useAccount({
    onConnect({ address, connector, isReconnected }) {

    },
  })

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



  const handleHouseModal = useCallback(() => {
    setIsModalOpen(prev => !prev);
  }, []);
  

  const handleMinigamesModal = () => {
    setIsMinigamesModalOpen(!isMinigamesModalOpen); // Toggle modal visibility
  };

  const copyToClipboard = () => {
    const textToCopy = "0x3dcb228369A17477C92d81Da117642Ed86Ce508B";
    navigator.clipboard.writeText(textToCopy).then(function() {
    }, function(err) {
      console.error('Could not copy text: ', err);
    });
  }

  const Modal = ({ handleClose, show}) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    const [houseChangeAmount, setHouseChangeAmount] = useState("");
    const [depositCheckingAllowance, setDepositCheckingAllowance] = useState(false);
    const [depositAwaitingApproval, setDepositAwaitingApproval] = useState(false);
    const [isDepositing, setIsDepositing] = useState(false);
    const [isWithdrawing, setIsWithdrawing] = useState(false);
   
    const handleHouseAmountChange = (e) => {
      const input = e.target.value;
      const rawNumber = input.replace(/[^0-9.]/g, '');

      // Check for and handle multiple dots or leading zeros
      const parts = rawNumber.split('.');
      const cleanNumber =
        parts.length > 2
          ? parts[0] + '.' + parts.slice(1).join('')
          : parts.join('.');

      setHouseChangeAmount(cleanNumber);
    };

    const handleBalanceClick = () => {
      if(userBalance === '0.00') {
        return;
      }
      setHouseChangeAmount(ethers.utils.formatUnits(userBalance, 'ether')); // Update the state that's tied to the input field
    };


    const handleDeposit = async () => {
      if(!checkNetwork()) {return;};
      // Convert the input amount to wei
      const amountInWei = ethers.utils.parseUnits(houseChangeAmount.toString(), 'ether');
    
      try {
        // Setup the provider and signer
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
  
        // Check and potentially approve token allowance for deposit
        await checkAndApproveAllowanceForDeposit(signer, amountInWei);
    
        const depositContract = new ethers.Contract(contractAddress, cABI, signer);
    
        // Get the user's address
        const userAddress = await signer.getAddress();
      
        setIsDepositing(true);
    
        // User does not own an NFT, so use the houseDeposit function
        const transaction = await depositContract.houseDeposit(currencyAddress, amountInWei);
        await transaction.wait(); // Wait for the transaction to be mined
        setIsDepositing(false);
        updateUserBalance();
        updateTotalHouseBalance();
        fetchTokenBalance();

      } catch (error) {
        console.error('Error in depositing:', error);
      }
    };

    const handleWithdraw = async () => {
      if(!checkNetwork()) {return;};
      // Convert the input amount to wei
      const amountInWei = ethers.utils.parseUnits(houseChangeAmount.toString(), 'ether');
    
      try {
        // Setup the provider and signer
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
    
        // Contract interaction setup
        const depositContract = new ethers.Contract(contractAddress, cABI, signer);
    
        setIsWithdrawing(true);
    
        // Call the withdraw function of the contract

        const transaction = await depositContract.houseWithdraw(currencyAddress, amountInWei);
        await transaction.wait(); // Wait for the transaction to be mined
        setIsWithdrawing(false);
        updateUserBalance();
        updateTotalHouseBalance();
        fetchTokenBalance();

      } catch (error) {
        console.error('Error in withdrawing:', error);
      }
    };
  
  
    const checkAndApproveAllowanceForDeposit = async (signer, amountInWei) => {
      // Assuming setIsCheckingAllowance and setIsAwaitingApproval are defined in your component
    
      setDepositCheckingAllowance(true);
      const tokenContract = new ethers.Contract(currencyAddress, tABI, signer); // Make sure tokenABI is defined and correct
    
      // Check current allowance
      const userAddress = await signer.getAddress();
      const allowance = await tokenContract.allowance(userAddress, contractAddress); // Ensure depositContractAddress is defined and correct
      if (allowance.lt(amountInWei)) { // lt is "less than"
        setDepositCheckingAllowance(false);
        setDepositAwaitingApproval(true);
    
        // Not enough allowance, need to approve
        const approveTx = await tokenContract.approve(contractAddress, amountInWei);
        await approveTx.wait(); // Wait for the approval transaction to be mined
        setDepositAwaitingApproval(false);
      } else {
        setDepositCheckingAllowance(false);
        // Allowance is already sufficient
      }
    };

    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          <div className='modal-inner'>
          <div style={{ textAlign: 'center' }}> {/* Center aligns all items */}
          <img className='logo' src={altlogo}/>
          <div className="balance-title">Your House Balance:</div>
          <div className="balance-value" onClick={handleBalanceClick}>
            {userBalance !== '0.00'?formatNumber(ethers.utils.formatUnits(userBalance, 'ether')): userBalance} {currency}
          </div>
          <input 
            type="text" 
            placeholder="Amount" 
            className="modal-input" 
            value={formatInputNumber(houseChangeAmount)} 
            onChange={handleHouseAmountChange}
          /> {/* Shared input box */}
          <div className="modal-button-container">
            <button
              className="modal-button"
              disabled={currentState !== '2' || depositCheckingAllowance || depositAwaitingApproval || isDepositing}
              onClick={handleDeposit}
            >
              {depositAwaitingApproval || depositCheckingAllowance ? "Approve..." : 
              isDepositing ? "Depositing..." : 
              "Deposit"}
            </button>
            <button
              className="modal-button"
              disabled={currentState !== '2' || isWithdrawing}
              onClick={handleWithdraw}
            >
              {isWithdrawing ? "Withdrawing..." : "Withdraw"}
            </button>
          </div>
          <div className="undertext">house balance changes are only allowed in between betting rounds, in the settled state</div>
          <div className="undertext">5% fee deposit/withdrawal</div>
          <div className="undertext">5% edge for house built into odds - house is NOT GUARANTEED to be profitable in each race/bet</div>
          <div className="undertext">please read docs before depositing</div>
        </div>
            <button className="close-button" onClick={handleClose}>Close</button>
          </div>
        </section>
      </div>
    );


  };

  const MinigamesModal = ({ handleClose, show}) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
      return (
      <div className={showHideClassName}>
        <section className="mini-games-modal-main">
          <div className='mini-games-modal-inner'>
          <div style={{ textAlign: 'center' }}> {/* Center aligns all items */}
          <img className='logo' src={altlogo}/>
          <div className="modal-button-container">
            <div className="game">

              <a href="/flip"><div className="box">Flip</div></a>

              <a href="/highlow"><div className="box">High/Low</div></a>
              
              <div>More coming soon...</div>
            </div>
          </div>
        </div>
            <button className="close-button" onClick={handleClose}>Close</button>
          </div>
        </section>
      </div>
    );
  };


  // Function to fetch token balance
  const fetchTokenBalance = async () => {
    let userProvider;
    if(window.ethereum) {
      userProvider = new ethers.providers.Web3Provider(window.ethereum);
    }
    
    try {
      if (!userProvider || !currencyAddress || !isConnected) {
        setTokenBalance("Unavailable");
        return;
      }

      const signer = userProvider.getSigner(); // Get the user's signer
      const userAddress = await signer.getAddress(); // Get the user's address
      const tokenContract = new ethers.Contract(currencyAddress, tABI, provider);
      const balance = await tokenContract.balanceOf(userAddress);
      const formattedBalance = ethers.utils.formatUnits(balance, 'ether'); // Or the appropriate number of decimals

      setTokenBalance(formattedBalance); // Update state with the formatted balance
    } catch (error) {
      console.error("Error fetching token balance:", error);
      setTokenBalance("Error");
    }
  };
  
  // Fetch token balance when component mounts or currencyAddress changes
  useEffect(() => {
    fetchTokenBalance();
  }, [currencyAddress, address, isConnected]); 

  useEffect(() => {

    if(contract) {
      const fetchPeriods = async () => {
        const bPeriod = await contract.bettingPeriod();
        const sPeriod = await contract.settledPeriod();
  
        setBettingPeriod(Number(bPeriod));
        setSettledPeriod(Number(sPeriod));
      };
      fetchPeriods();
    }



    if(contract && wssProvider) {
  
    // Listener for RequestedUint256
    contract.on("RequestedUint256", (requestId) => {
      setCurrentRequestId(requestId.toString());  // Update the state with the new requestId
    });

    // Listener for RequestedUint256
    contract.on("NextGameOdds", (oddsA, oddsB, oddsC, oddsD) => {
      setGameStarted(oddsA); 
    });
  
    // Listener for ReceivedUint256
    contract.on("ReceivedUint256", (requestId, response) => {
      setCurrentResponse({ requestId: requestId.toString(), response: response.toString() });  // Update the state with the new response and requestId
    });

    return () => {
      // Clean up listeners when the component is unmounted or dependencies change
      contract.removeAllListeners("RequestedUint256");
      contract.removeAllListeners("ReceivedUint256");
      contract.removeAllListeners("NextGameOdds");
    };
    }

  }, [contract, wssProvider]);

  useEffect(() => {
    const fetchGlobalFeedGraphData = async () => {
      try {
        const globalBetsResponse = await graphClient.query(globalBetsQuery).toPromise();
  
        // Assuming the response data is directly in globalBetsResponse.data.betPlaceds
        // Map the response to match your state's structure if needed
        const initialGlobalBets = globalBetsResponse.data.betPlaceds.map(bet => ({
          user: bet.user,
          betId: bet.betId,
          betAmount: ethers.utils.formatEther(bet.betAmount),
          tokenSelection: currencyNames[bet.tokenSelection?.toLowerCase()] ?? "Unknown Currency",
          choice: bet.choice,
          raceId: bet.raceId,
        })).reverse();
  
        setGlobalBets(initialGlobalBets); // Update your state with the initial bets
      } catch (error) {
        console.error("Error fetching global feed data from The Graph:", error);
      }
    };
  
    if (wssProvider && contract) {
      fetchGlobalFeedGraphData(); // Fetch initial data from The Graph
  
      // Listener setup remains unchanged
      contract.on(contract.filters.BetPlaced(), (user, betId, betAmount, tokenSelection, choice, raceId) => {
        const newGlobalBet = {
          user: user.toString(),
          betId: betId.toString(),
          betAmount: ethers.utils.formatEther(betAmount),
          tokenSelection: currencyNames[tokenSelection?.toLowerCase()] ?? "Unknown Currency",
          choice: choice.toString(),
          raceId: raceId.toString(),
        };
  
        setGlobalBets(prevBets => [...prevBets, newGlobalBet].slice(-10)); // Keep only the last 10 bets
      });
  
      return () => {
        // Clean up the listener when the component is unmounted
        contract.removeAllListeners(contract.filters.BetPlaced());
      };
    }
  }, [wssProvider, contract]); 

  useEffect(() => {

    if(contract) {
      const fetchContractState = async () => {
        try {
          const state = await contract.currentState(); // Fetching current state
          const settledTime = await contract.timeSettled(); // Fetching time settled
    
          setCurrentState(state.toString());
          setTimeSettled(settledTime.toString());
    
          // Additional logic based on state
          // ...
        } catch (error) {
          console.error("Error fetching contract state or time settled:", error);
        }
      };
    
      fetchContractState();
    }
  }, [currentRequestId, currentResponse, gameStarted, contract]); 

  const fetchUserBetsGraphData = async () => {
    if (!address) return; // Ensure address is available
    const userBetsQuery = getUserFeedQuery(address);
    try {
      const userBetsResponse = await graphClient.query(userBetsQuery).toPromise();

      // Map and reverse the initial bets for proper display order
      let initialUserBets = userBetsResponse.data.betPlaceds.map(bet => ({
        user: bet.user,
        betId: bet.betId,
        betAmount: ethers.utils.formatEther(bet.betAmount),
        tokenSelection: currencyNames[bet.tokenSelection?.toLowerCase()] ?? "Unknown Currency",
        choice: bet.choice,
        raceId: bet.raceId,
        status: "pending" // Default status, will be updated below
      })).reverse();

      // Update bet statuses and claimed statuses
      initialUserBets = await Promise.all(initialUserBets.map(async bet => {
        const status = await updateBetStatus(bet);
        const claimedStatus = await checkClaimedStatus(bet);
        return { ...bet, status, claimedStatus }; // Combine status updates
      }));

      setRecentBets(initialUserBets); // Set the initial list of bets with updated statuses
    } catch (error) {
      console.error("Error fetching user bets from The Graph:", error);
    }
  };

  useEffect(() => {
 
    if (wssProvider && contract && isConnected) {
      fetchUserBetsGraphData(); // Fetch initial data from The Graph
  
      // Listener for new BetPlaced events
      const betPlacedListener = (user, betId, betAmount, tokenSelection, choice, raceId) => {
        if (user === address) {
          const newBet = {
            user: user.toString(),
            betId: betId.toString(),
            betAmount: ethers.utils.formatEther(betAmount),
            tokenSelection: currencyNames[tokenSelection?.toLowerCase()] ?? "Unknown Currency",
            choice: choice.toString(),
            raceId: raceId.toString(),
            status: "pending" // Initial status for new bets
          };
    
          setRecentBets(prevBets => [...prevBets, newBet].slice(-5)); // Keep the last 5 bets
        }
      };
  
      contract.on(contract.filters.BetPlaced(), betPlacedListener);
  
      return () => {
        // Clean up the listener when the component is unmounted
        contract.removeAllListeners(contract.filters.BetPlaced());
      };
    }
  }, [address, isConnected, wssProvider, contract]);

  const checkClaimedStatus = async (bet) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractWithSigner = contract.connect(signer);
    const tokenAddress = currencyAddresses[bet.tokenSelection.toUpperCase()];

    const key = await contractWithSigner.getKey(
      bet.raceId, 
      bet.choice, 
      tokenAddress
    );

    const userShares = await contract.userBettingPoolShares(await signer.getAddress(), key);
    return userShares && userShares.gt(0) ? "unclaimed" : "claimed";
  };

  // const fetchBetsAndUpdateStatus = async () => {
  //   if(!checkNetwork()) {return;};
  //   try {
  //     // Define the filter and fetch logs
  //     const betPlacedTopic = ethers.utils.id("BetPlaced(address,uint256,uint256,address,uint8,uint256)");
  //     const latestBlock = await wssProvider.getBlockNumber();
  //     const fromBlock = Math.max(0, latestBlock -1000);

  //     const userAddress = address;

  //     const filter = {
  //       fromBlock: fromBlock,
  //       toBlock: 'latest',
  //       address: contractAddress,
  //       topics: [betPlacedTopic, ethers.utils.hexZeroPad(userAddress, 32)]
  //     };

  //     let logs = await wssProvider.getLogs(filter);

  //     // Slice the logs to only handle the latest 4 bets before decoding
  //     logs = logs.slice(-5);

  //     // Decode logs and set initial bets
  //     const decodedEvents = logs.map((log, index) => {
  //       try {
  //         const parsedLog = contract.interface.parseLog(log);
  //         const { betId, betAmount, tokenSelection, choice, raceId } = parsedLog.args;
  //         return {
  //           betId: betId?.toString() ?? "undefined betId",
  //           betAmount: betAmount ? ethers.utils.formatEther(betAmount) : "undefined betAmount",
  //           tokenSelection: currencyNames[tokenSelection?.toLowerCase()] ?? "undefined tokenSelection",
  //           choice: choice?.toString() ?? "undefined choice",
  //           raceId: raceId?.toString() ?? "undefined raceId",
  //           status: "pending" // Initially set all bets to pending
  //         };
          
  //       } catch (error) {
  //         console.error(`Error processing log index ${index}:`, log, error);
  //         return null; // or some other error handling
  //       }
  //     }).filter(event => event);

  //     // Update bet statuses based on race results and claim status
  //     const updatedBets = await Promise.all(decodedEvents.map(async bet => {
  //       const status = await updateBetStatus(bet); // existing status update function
  //       const claimedStatus = await checkClaimedStatus(bet); // new claimed status check
  //       return { ...bet, status, claimedStatus };  // Return the bet with the updated statuses
  //     }));

  //     setRecentBets(updatedBets); // Update the state again with the statuses
  //   } catch (error) {
  //     console.error("Error fetching events: ", error);
  //     const retryDelay = 1000; // Delay in milliseconds, e.g., 3000ms for 3 seconds
  //     setTimeout(() => {
  //       fetchBetsAndUpdateStatus();
  //     }, retryDelay);
  //   }
  // };

  const updateBetStatus = async (bet) => {  
    try {
      const vrfResult = await contract.rawVrfList(bet.raceId);
      if (vrfResult && vrfResult > 0) {
        const raceWinner = await contract.raceWinner(bet.raceId);
        return raceWinner.toString() == bet.choice ? 'won' : 'lost';
      } else {
        return 'pending';  // Still pending if VRF result is not greater than 0
      }
    } catch (error) {
      console.error(`Error updating status for betId: ${bet.betId}`, error);
      return 'error';  // Return 'error' status in case of any error
    }
  };

  let debounceTimeout;

  const checkBetWithinRisk = async() => {

      try {
        let isBetWithinRisk;
        if(currentState == 0) {
          isBetWithinRisk = await contract._betWithinRisk(
            currencyAddress,
            activeOption - 1,
            ethers.utils.parseEther(betAmount || "0") // Ensuring betAmount is never an invalid input
          );
        } else {
          const betRisk = parseFloat(betAmount) * Object.values(odds)[activeOption-1];
          isBetWithinRisk = parseFloat(betRisk) < (totalHouseBalance/10);
        }


        setBetWithinRisk(isBetWithinRisk); 

      } catch (error) {
        setBetWithinRisk(false);
        console.error("Error fetching risk check:", error);
      }
    };

    useEffect(() => {
      // Clear the previous timeout if there is one
      clearTimeout(debounceTimeout);
  
      // Set a new timeout
      debounceTimeout = setTimeout(() => {
        // Only call the function if betAmount is a valid number
        if (betAmount) {
          checkBetWithinRisk();
        }
      }, 500); // Adjust the delay as needed
  
      // Clean up the timeout when the component is unmounted or dependencies change
      return () => {
        clearTimeout(debounceTimeout);
      };
    }, [currencyAddress, activeOption, betAmount, contract]);

    useEffect(() => {
      if(contract) {
        const fetchGameStarted = async () => {
          try {
            const gameStartedTimestamp = await contract.gameStarted(); // Fetch from contract
            setEndTime(gameStartedTimestamp.toNumber() + bettingPeriod + 3); // +300 seconds for 5 minutes (plus block time)
          } catch (error) {
            console.error("Error fetching game started time:", error);
          }
        };
      
        fetchGameStarted();
      }


    }, [gameStarted, contract]);

    useEffect(() => {
    if(contract) {
      const updateOdds = async () => {
        try {
          const currentRaceId = await contract.raceId();
          // Adjusting for previous race as the Solidity function does
          const adjustedRaceId = currentRaceId.sub(1);
    
          // Fetch the raw VRF value for the adjusted race ID
          const vrfRaw = await contract.rawVrfList(adjustedRaceId);
    
          // Replicating the Solidity logic in JavaScript
          const DECIMAL_ADJUSTMENT = ethers.constants.WeiPerEther; 
    
          const horseAOdds = vrfRaw.mod(97).add(10);
          const horseBOdds = vrfRaw.mod(67).add(10);
          const horseCOdds = vrfRaw.mod(47).add(10);
          const horseDOdds = vrfRaw.mod(17).add(10);
    
          const sumHorseOdds = horseAOdds.add(horseBOdds).add(horseCOdds).add(horseDOdds);
    
          // Adjusting with decimal adjustment (ensure to replicate the same logic as Solidity)
          const adjOddsA = DECIMAL_ADJUSTMENT.mul(sumHorseOdds).mul(95).div(100).div(horseAOdds);
          const adjOddsB = DECIMAL_ADJUSTMENT.mul(sumHorseOdds).mul(95).div(100).div(horseBOdds);
          const adjOddsC = DECIMAL_ADJUSTMENT.mul(sumHorseOdds).mul(95).div(100).div(horseCOdds);
          const adjOddsD = DECIMAL_ADJUSTMENT.mul(sumHorseOdds).mul(95).div(100).div(horseDOdds);
    
          // Update state with fetched odds, ensure to convert BigNumber to a usable format
          setOdds({
            oddsA: formatOdds(adjOddsA),
            oddsB: formatOdds(adjOddsB),
            oddsC: formatOdds(adjOddsC),
            oddsD: formatOdds(adjOddsD)
          });
    
        } catch (error) {
          console.error("Error fetching odds:", error);
        }
      };
    
      updateOdds();
    }

    
      return () => {
        // Cleanup if needed
      };
    }, [currentResponse, contract]);

  useEffect(() => {

    const fetchReferralBalance = async () => {
      if (address && currencyAddress && contract) {
        try {
          const balance = await contract.referralBalance(currencyAddress, address);
    
          // Convert balance from wei to Ether or relevant unit
          const balanceInEther = parseFloat(ethers.utils.formatUnits(balance, 'ether'));
    
          // Determine the formatting based on the balance value
          let formattedBalance;
          if (balanceInEther < 1) {
            // For balance less than 1, use toPrecision(4)
            formattedBalance = balanceInEther.toPrecision(4);
          } else {
            // For balance of 1 or more, use toFixed(2)
            formattedBalance = balanceInEther.toFixed(2);
          }
    
          // Update state with the formatted balance
          setReferralAmount(formattedBalance);
        } catch (error) {
          console.error("Error fetching referral balance:", error);
        }
      }
    };
  
    fetchReferralBalance();
  }, [address, currencyAddress, currentResponse, contract]);

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

  const updateUserBalance = async () => {
    try {
        // Ensure the connectedAddress is valid and the currencyAddress is set
        if (address) {
            const userShares = await contract.userHouseShares(address, currencyAddress);
            if(parseFloat(userShares) == 0) {
              setUserBalance(parseFloat(0).toFixed(2));
            } else {
            const pool = await contract.housePools(currencyAddress);

            // Convert all BigNumbers to numbers for calculation
            const userSharesNum = userShares;
            const rawHSharesNum = pool.totalShares.sub(1);
            const rawHBalanceNum = pool.totalBalance.sub(1);

            // Calculate the user's share of the total balance
            const userShareOfTotalBalance = userSharesNum.mul(rawHBalanceNum).div(rawHSharesNum);

            setUserBalance(userShareOfTotalBalance);
          }
        }
    } catch (error) {
        console.error("Error fetching user's balance:", error);
    }
};

useEffect(() => {
  if(contract) {
    updateTotalHouseBalance();
  }

  // Re-fetch the total balance whenever the currencyAddress changes
}, [currencyAddress, currentResponse, contract, address]);

  useEffect(() => {
    if(contract) {
      updateUserBalance();
    }
      // Re-fetch the user balance whenever the connected address or currencyAddress changes
  }, [address,currencyAddress, currentResponse, contract]);

  const currentVrfValues = async (raceId) => {
    try {
      const vrf1 = await contract.rawVrfList(raceId-2);
      const vrf2 = await contract.rawVrfList(raceId-1); 

      setVrf1(vrf1);
      setVrf2(vrf2);

    } catch (error) {
      console.error("Error fetching vrf values:", error);
    }
  };

  useEffect(() => {

    if(contract) {
      const fetchRaceIdAndVrf = async () => {
        try {
          const fetchedRaceId = await contract.raceId(); 
          await currentVrfValues(fetchedRaceId);
        } catch (error) {
          console.error("Error in fetching raceId or vrf values:", error);
        }
      };
    
      fetchRaceIdAndVrf();
    }
  
  }, [currentResponse, contract]);

  // Helper function to convert and format odds
  const formatOdds = (odds) => {
    // Ensure that the odds are a BigNumber
    const oddsBN = ethers.BigNumber.from(odds);
    
    // Convert from wei to Ether and then to a number for formatting
    const oddsInEther = parseFloat(ethers.utils.formatUnits(oddsBN, 'ether'));
    const oddsAdj = oddsInEther * .95;
    // Format to 4 significant figures and return
    return oddsAdj.toPrecision(4);
  };

  const calculateWinnings = () => {
    const bet = parseFloat(betAmount); // Ensure betAmount is a number
    if (!bet || bet <= 0) return "0"; // Return 0 if betAmount is not a positive number

    // Retrieve the odds for the active option
    const currentOdds = Object.values(odds)[activeOption - 1];

    // Calculate potential winnings
    const potentialWinnings = bet * currentOdds;

    if(potentialWinnings <= 10) {
      return potentialWinnings.toPrecision(5);
    } else {
      if(potentialWinnings <= 100) {
        return potentialWinnings.toFixed(3); // Format as a string with two decimal places
      } else {
        return potentialWinnings.toFixed(2);
      }
    }
  };

  

  const handleMouseEnter = () => {
    if (currentSegment === 'initial' || currentSegment === 'final') {
      setCurrentSegment("initial");
      lottieRef.current.anim.playSegments([0, 16], true);
      setIsPaused(false);
      setDirection(1);
    }
  };

  const handleMouseLeave = () => {
    if (currentSegment === 'initial') {
      lottieRef.current.anim.playSegments([16, 0], true);
      setIsPaused(false);
      setDirection(-1);
    }
  };

  const handleClick = () => {
    toggleMenu();
    if (currentSegment === 'initial' || currentSegment === 'final') {
      lottieRef.current.anim.playSegments([16, 37], true);
      setCurrentSegment('cross');
    } else if (currentSegment === 'cross') {
      lottieRef.current.anim.playSegments([37, 70], true);
      setCurrentSegment('final');
    }
    setIsPaused(false);
    setDirection(1);

  };
  
  const handleComplete = () => {
    setIsPaused(true);
    if (currentSegment === 'final') {
      setCurrentSegment('initial'); // Reset to initial state
      setDirection(1);
    }
  };

  function toggleMenu() {
    setHeaderOpen(prevOpen => !prevOpen); 
  }

  const defaultLottieOptions = {
    loop: false,
    autoplay: false,
    animationData: menu,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const checkFinishReady = () => {
    const finishAvailTime = parseInt(gameStarted) + bettingPeriod + 3; // + block time
    const currentTime = Math.floor(Date.now()/1000);

    if(currentTime > finishAvailTime) {
      return true;
    } else {
      return false;
    }
  }

 const checkBetReady = () => {
  const settledTimePlusFiveMinutes = parseInt(timeSettled) + settledPeriod + 3; // + block time
  const currentTime = Math.floor(Date.now()/1000);
  if (currentState == 0) {
    return true;
  } else if (
    currentState == 2 
    && currentTime > settledTimePlusFiveMinutes
    ) {
    return true;
  } else {
    return false;
  }
 }

  // Function to handle currency change
  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
    setCurrencyAddress(currencyAddresses[newCurrency]);
    setShowDropdown(false); // Hide dropdown after selection
  };

  // Function to handle clicking an option
  const handleOptionClick = (optionNumber) => {
    setActiveOption(optionNumber);
  };

  const formatNumber = (value) => {
    if (value === null || value === undefined || value === '') return "0.00"; // or return "" for empty
  
    // Convert value to a number first if it's not already
    const numericValue = typeof value === 'number' ? value : parseFloat(value);
  
    if (isNaN(numericValue)) return "0.00"; // or handle error as you see fit

      // Determine the number of decimal places based on the value
    let decimalPlaces;
    if (numericValue < 1) {
      decimalPlaces = 6;
    } else if (numericValue < 100) {
      decimalPlaces = 4;
    } else {
      decimalPlaces = 2;
    }
  
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2, // Minimum number of digits after the decimal point
      maximumFractionDigits: decimalPlaces, // Maximum number of digits after the decimal point
    }).format(numericValue);
  };

  const formatInputNumber = (value) => {
    // Allow the user to finish typing decimals
    if (/^\d*\.?\d*$/.test(value)) {
      return value; // Return as is, user might be typing the decimal part
    }
  
    // For non-numeric inputs, you might want to handle it or return a default value
    return value.replace(/[^0-9.]/g, ''); // Removes anything that's not a digit or a dot
  };

  const handleBetAmountChange = (e) => {
    const input = e.target.value;
    const rawNumber = input.replace(/[^0-9.]/g, '');

    // Check for and handle multiple dots or leading zeros
    const parts = rawNumber.split('.');
    const cleanNumber =
      parts.length > 2
        ? parts[0] + '.' + parts.slice(1).join('')
        : parts.join('.');

    setBetAmount(cleanNumber);
  };

  const handleClaimReferral = async () => {
    if(!checkNetwork()) {return;};
    // Make sure the user is connected with a wallet.

    if(contract) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractWithSigner = contract.connect(signer);
    
        // Call the claimReferrals function with the currencyAddress
        const tx = await contractWithSigner.claimReferrals(currencyAddress);
    
        // Optionally, listen for the transaction to be mined here
    
      } catch (error) {
        console.error('Error claiming referral:', error);
        // Handle errors, e.g., user rejects transaction, etc.
      }
    }
  };
  
  const handleClaimBet = async (bet) => {
    if(!checkNetwork()) {return;};
    if(contract) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractWithSigner = contract.connect(signer);
    
        // Convert tokenSelection name back to address
        const tokenAddress = currencyAddresses[bet.tokenSelection.toUpperCase()]; // Ensure token names are in uppercase for lookup
    
        // Call getKey function from the contract
        const key = await contractWithSigner.getKey(
          bet.raceId, 
          bet.choice, // Assuming this is already in the correct format expected by the contract
          tokenAddress
        );

        // Check user's shares for this bet
        const userShares = await contract.userBettingPoolShares(await signer.getAddress(), key);
    
        if (userShares && userShares.gt(0)) {
          const tx = await contractWithSigner.claimWinningBet(
            bet.raceId,
            tokenAddress, 
            bet.choice // Convert choice back to 0-indexed if necessary
          );
          // Wait for transaction to be mined
          const receipt = await tx.wait();
          if (receipt && receipt.status === 1) { // Check if transaction was successful
            // Update claimedStatus for all related bets
            setRecentBets(prevBets => prevBets.map(prevBet => {
              // Check if the bet matches the raceId and option of the bet just claimed
              if (prevBet.raceId === bet.raceId && prevBet.choice === bet.choice && prevBet.tokenSelection === bet.tokenSelection) {
                return { ...prevBet, claimedStatus: "claimed" }; // Update claimedStatus
              }
              return prevBet; // Return unchanged if not the matching bet
            }));
          }
          fetchTokenBalance();
        }
    
      } catch (error) {
        console.error('Error claiming bet:', error);
      }
    }
  };
  
  

  const requestFinish = async () => {
    if(!checkNetwork() || !checkFinishReady()) {return;};
    if(contract) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractWithSigner = contract.connect(signer);
    
        // Call the claimReferrals function with the currencyAddress
        const tx = await contractWithSigner.requestFinish();
    
        // Optionally, listen for the transaction to be mined here
    
      } catch (error) {
        console.error('Error requesting finish:', error);
        // Handle errors, e.g., user rejects transaction, etc.
      }
    }

  };

  const updateReferral = async () => {
    if(!checkNetwork()) {return;};
    if (!ethers.utils.isAddress(referralAddress)) {
      console.error("Invalid address");
      return; // Exit if the input is not a valid address
    }

    if(contract) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractWithSigner = contract.connect(signer);
    
        // Call the updateReferral function with the referralAddress
        const tx = await contractWithSigner.updateReferral(referralAddress);
    
        // Optionally, listen for the transaction to be mined here
    
      } catch (error) {
        console.error('Error setting new referral:', error);
        // Handle errors, e.g., user rejects transaction, etc.
      }
    }

  };

  const checkAndApproveAllowance = async () => {
    if(!checkNetwork()) {return;};
    setIsCheckingAllowance(true);
    if (betWithinRisk && checkBetReady() && contract) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const tokenContract = new ethers.Contract(currencyAddress, tABI, signer); // Assuming you have the token's ABI
  
      // Check current allowance
      const allowance = await tokenContract.allowance(await signer.getAddress(), contractAddress);
      const formattedAllowance = ethers.utils.formatUnits(allowance, 18);
      const betAmountInUnits = ethers.utils.parseUnits(betAmount.toString(), 18);
  
      if (formattedAllowance < betAmount) {
        setIsCheckingAllowance(false);
        setIsAwaitingApproval(true);
        // Not enough allowance, need to approve
        const approveTx = await tokenContract.approve(contractAddress, betAmountInUnits);
        await approveTx.wait();
        setIsAwaitingApproval(false);
         // Wait for the approval transaction to be mined
        await handlePlaceBet(); // After approval, proceed to place the bet
        fetchTokenBalance();
      } else {
        setIsCheckingAllowance(false);
        // If the allowance is already sufficient, place the bet directly
        await handlePlaceBet();
      }
    }
  };
  
  const handlePlaceBet = async () => {
    setIsPlacingBet(true);
    if(contract) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractWithSigner = contract.connect(signer);
    
      try {
        const tx = await contractWithSigner.placeBet(
          currencyAddress, 
          ethers.utils.parseUnits(betAmount.toString(), 18), 
          activeOption - 1
        );
      } catch (error) {
        console.error('Error placing bet:', error);
      }
    }
    setIsPlacingBet(false);
  };

  const CountdownTimer = ({ currentState, timeSettled, settledPeriod, endTime }) => {
    const [countdown, setCountdown] = useState('00:00');
    const [nextGameCountdown, setNextGameCountdown] = useState('00:00');
  
    // Your useEffect hooks for setting countdown and nextGameCountdown...
  

    useEffect(() => {
      if (currentState == 2) { // If the state is 'Settled'
        const calculateCountdown = () => {
          const settledTimePlusFiveMinutes = parseInt(timeSettled) + settledPeriod + 3; // + block time
          const interval = setInterval(() => {
            const currentTime = Math.floor(Date.now()/1000);
            const timeLeft = settledTimePlusFiveMinutes - currentTime;
            if (timeLeft <= 0) {
              clearInterval(interval);
              setNextGameCountdown('00:00');
            } else {
              const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
              const seconds = (timeLeft % 60).toString().padStart(2, '0');
              setNextGameCountdown(`${minutes}:${seconds}`);
            }
          }, 1000);
          return () => clearInterval(interval);
        };
        calculateCountdown();
      }
    }, [currentState, timeSettled, settledPeriod]); // React to changes in currentState and timeSettled
    
    useEffect(() => {
      const interval = setInterval(() => {
        const currentTime = Math.floor(Date.now() / 1000);
        const timeLeft = endTime - currentTime; // Calculate time left until gameStarted + 5 minutes
    
        if (timeLeft > 0) {
          // Update countdown
          const minutes = Math.floor(timeLeft / 60);
          const seconds = timeLeft % 60;
          setCountdown(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        } else {
          // If time left is 0 or less, stop countdown and enable button
          setCountdown('00:00');
          clearInterval(interval); // Stop the interval as countdown is finished
        }
      }, 1000);
    
      return () => clearInterval(interval); // Clean up on component unmount
    }, [endTime]); // Rerun effect if endTime changes

    return (
      <div>
        {currentState == 0 && countdown == "00:00" ? "Finish available" :
        currentState == 0 ? <div className="bet-end-timer">Please wait {countdown}</div> :
        currentState == 2 && nextGameCountdown !== "00:00" ? <div className="bet-end-timer">Next game: {nextGameCountdown}</div> :
        currentState == 1 ? "Awaiting QRNG" : <div>Next game available now</div>}
      </div>
    );
  };
  
 
  return (
    <MainPageStyleWrapper>
      {headerOpen &&
        <div className='header'>
          <Header />
        </div> 
      }
      {/* Top-left: Game Box */}
      <div className="game-box">
        <div className="game-outer">
          <div className="game-inner">
            <div className ="game-main">
              <Game vrf1={vrf1} vrf2={vrf2}/>
              {/* connect button and page options go here () */}
            </div>
          {/* Game animations will go here */}
          </div>
        </div>
      </div>
      {/* Top-right: Login and Chat Box */}
      <div className="login-chat-box">
        <div className ="login-outer">
          <div className ="login-inner">
            <div className ="connect-wallet">
              {/* Moved connect button and network switch here */}
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
              >
                <Lottie
                  ref={lottieRef}
                  options={defaultLottieOptions}
                  height={64}
                  width={64}
                  isPaused={isPaused}
                  direction={direction}
                  eventListeners={[
                    {
                      eventName: 'complete',
                      callback: handleComplete,
                    },
                  ]}
                />
              </div>
              <Web3Button variant="mint" className="connect_btn" icon="show" label="Connect Wallet" />
              <div className="switchNet">
                <Web3NetworkSwitch />
              </div>
              <Portal>
                {ethereumClient && projectId && chainImages && themeVariables
                && <Web3Modal projectId={projectId} ethereumClient={ethereumClient} chainImages={chainImages} themeVariables={themeVariables}/>
                }
                
              </Portal>
              {/* connect button and page options go here */}
            </div>
            <div className ="chat-box">
              <Chat/>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom-left: Functions Box */}
      <div className="functions-box">
      <div className ="functions-outer">
          <div className ="functions-inner">
            <div className ="bet-choices">
              <div className="bet-options">
                {Array.from({ length: 4 }, (_, i) => (
                  <div key={i} className={`bet-options${i + 1}`} onClick={() => handleOptionClick(i + 1)}>
                    <div className={`container-${i + 1}`}>
                      {/* Change class based on whether this option is active */}
                      <div className={activeOption === i + 1 ? "ball-animation" : "idle-animation"} />
                    </div>
                    <div className={`odds-display`}>{Object.values(odds)[i]}x</div>
                  </div>
                ))}
              </div>
              <div className ="bet-balances">
                
                <div className="currency-choice" onClick={() => setShowDropdown(!showDropdown)}>
                  <div className="select-currency">Select Token</div>
                  <button className="select-currency-button">
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
                <div className ="winnings-balance">
                  <div>Referrals:</div>
                  <div className='referrals-number'>{formatNumber(referralAmount)} {currency} 
                    <button 
                      className="claim-referrals-button" 
                      onClick={handleClaimReferral}
                      disabled={referralAmount == 0}
                    >Claim</button>
                  </div>
                  <div className="referrals">Referral Address:</div>
                  <div>
                  <input
                    type="text"
                    placeholder='paste address here'
                    className="referral-input-box"
                    value={referralAddress}
                    onChange={(e) => setReferralAddress(e.target.value)}
                  />
                  <button 
                    className="submit-referrals-button"
                    disabled={!ethers.utils.isAddress(referralAddress)}
                    onClick={updateReferral}
                  >Submit</button>
                  </div>
                </div>
                <div className ="user-house-balance">
                  <div className="balance-title">House Balance:</div>
                  <div className="balance-value">{formatNumber(totalHouseBalance)} {currency}</div>
                  <div className="balance-title">Your Balance:</div>
                  <div className="balance-value">{userBalance !== '0.00'?formatNumber(ethers.utils.formatUnits(userBalance, 'ether')): userBalance} {currency}</div>
                  <button className="house-modal-button" onClick={handleHouseModal}>deposit/withdraw</button>

                </div>
                <div className ="misc-functions">
                  <div className ="misc-top">
                    <CountdownTimer
                      currentState={currentState}
                      timeSettled={timeSettled}
                      settledPeriod={settledPeriod}
                      endTime={endTime}
                    />
                    <button 
                      className="request-finish-button" 
                      disabled={currentState == 1 || currentState == 2}
                      onClick={requestFinish}
                    >Request Finish</button>
                  </div>
                  <div className ="misc-bottom">
                    <button
                      className="minigames"
                      onClick={handleMinigamesModal}
                    >
                      <div className="minigames-text">MINIGAMES</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className ="bet-functions">
              <div className ="bet-main">

                <div className ="bet-main-bottom">
                  <div className = "bet-box">

                    <div className = "bet-amount">
                      <div className="bet-amount-inner">
                      <div className="token-balance">
                        {currency} balance: {formatNumber(tokenBalance)} 
                      </div>
                        <div>
                          <input
                            type="text" // changed from "number" to "text"
                            placeholder="type bet here"
                            className="bet-amount-input-box"
                            value={formatInputNumber(betAmount)} // Display formatted value
                            onChange={handleBetAmountChange}
                          /> {currency}
                        </div>
                        <div className="max-bet"> 
                        {betAmount?
                        betWithinRisk? 
                        "Bet within risk" : "bet is too large" : ""}</div>
                      </div>
                      
                    </div>
                    <div className="bet-selection">
                      <div className="bet-selection-inner"
                          style={{
                            // Apply the hue-rotation filter based on the active option
                            filter: `hue-rotate(${activeOption* 90}deg)`
                          }}>
                            <div className ="idlealt-animation"/>
                      </div>
                    </div>
                    <div className = "bet-placement">
                    <button
                      className='bet-button'
                      disabled={!betWithinRisk || !checkBetReady() || isCheckingAllowance || isAwaitingApproval || isPlacingBet}
                      onClick={checkAndApproveAllowance}
                    >
                      {(isAwaitingApproval || isCheckingAllowance) && "Approve..."}
                      {isPlacingBet && "Betting..."}
                      {!(isCheckingAllowance || isAwaitingApproval || isPlacingBet) && "Place Bet"}
                    </button>
                      <div className="bet-summary">
                        
                          {betAmount? formatNumber(betAmount):0} {currency} on {optionLabels[activeOption-1]}
                      </div>
                      <div className="bet-summary">
                          to win: {formatNumber(calculateWinnings())} {currency}
                      </div>
                    </div>
                  </div>
                  <div className = "bet-results">
                  <div className="bet-result">
                    <div className='bet-result-title'>Bet Results
                    <button 
                      className="refresh-button"
                      onClick={fetchUserBetsGraphData}
                    >
                      <img className="refresh-img" src={refreshIcon} width="15px" height="15px"/>
                    </button>
                    </div>
                    {
                      isConnected ? (
                        recentBets.slice(-5).map((bet, index) => (
                          <div className="recent-bets" key={index}>
                            raceid: {bet.raceId} - {formatNumber(bet.betAmount)} {bet.tokenSelection} on {optionLabels[bet.choice]}{" - "}
                            [betId: {bet.betId}]{" - "}
                            {/* Display status, and change it to 'Claimed' if the claimedStatus is 'claimed' */}
                            <span className={`status-${bet.claimedStatus === 'claimed' ? 'claimed' : bet.status.toLowerCase()}`}>
                              status: {bet.claimedStatus === 'claimed' ? 'claimed' : bet.status}
                            </span>
                            {/* Show claim button if the status is 'won' and claimedStatus is 'unclaimed' */}
                            {bet.status === 'won' && bet.claimedStatus === 'unclaimed' && (
                              <button 
                                className="claim-bet-button"
                                onClick={() => handleClaimBet(bet)}
                              >
                                Claim
                              </button>
                            )}


                          </div>
                        ))
                      ) : (
                        <div className='pre-connect-display'>
                          please connect to see your recent bets
                        </div>
                      )
                    }
                  </div>

                  </div>
                </div>

              </div>
            </div>
          {/* Smart contract functions and other elements will go here */}
          </div>
        </div>
        
      </div>

      {/* Bottom-right: Events Box */}
      <div className="events-box">
        <div className ="events-outer">
          <div className ="events-inner">
            <div className= "events-title">
              Recent Bet Feed
            </div>
            <div className ="events-feed">
              {
                globalBets.map((bet, index) => (
                  <div key={index}>
                    <span>RaceId: {bet.raceId} | {bet.user.slice(0, 12)} | {formatNumber(bet.betAmount)} {bet.tokenSelection} | Option {optionLabels[bet.choice]} | [BetID: {bet.betId}]</span> <br/>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        
      </div>
      {userBalance !== undefined && (
        <Modal
          handleClose={handleHouseModal}
          show={isModalOpen}
          currency={currency}
          userBalance={userBalance}
        />
      )}
      <MinigamesModal show={isMinigamesModalOpen} handleClose={handleMinigamesModal}>
      </MinigamesModal>
    </MainPageStyleWrapper>
  );
};

export default MainPage;
