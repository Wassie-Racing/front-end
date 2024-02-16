import React, { useEffect, useRef, useState } from 'react';

import ChatStyleWrapper from './Chat.style';

import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore, serverTimestamp, addDoc, collection, query, orderBy, limit } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAMabIa6WQPI5FUSz4mKI8UHwIwY38D0BE",
  authDomain: "degenesys-dbd10.firebaseapp.com",
  projectId: "degenesys-dbd10",
  storageBucket: "degenesys-dbd10.appspot.com",
  messagingSenderId: "740833370490",
  appId: "1:740833370490:web:d11d203a466b260c4976c3",
  measurementId: "G-3JVMZS0FP3"
};

initializeApp(firebaseConfig);
const auth = getAuth();
const firestore = getFirestore();
const analytics = getAnalytics();


function Chat() {


  const [user] = useAuthState(auth);

  // Automatically sign out the user when they leave the webpage
  useEffect(() => {
    const handleUnload = () => {
      auth.signOut();
    };

    window.addEventListener('beforeunload', handleUnload);

    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  return (
    <ChatStyleWrapper>
      <div className="chat-room-container">
        <header>
          <h1>
            {user ? "" : "Connecting to live chat..."}
          </h1>
        </header>

        <div className="chat-scrollable">
          <section>
            {user ? <ChatRoom /> : <SignIn />}
          </section>
        </div>

        <div className="chat-input-form">
          {/* Chat input form goes here */}
        </div>
      </div>
    </ChatStyleWrapper>
  );
}

function SignIn() {

  const signIn = signInAnonymously(auth).catch((error) => {
    console.error("Anonymous Sign-In Error: ", error);
  });


  return;
}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}


function ChatRoom() {
  const dummy = useRef();
  const messagesRef = collection(firestore, 'messages');
  const q = query(messagesRef, orderBy('createdAt', 'desc'), limit(25));
  const [messages] = useCollectionData(q, { idField: 'id' });
  const [formValue, setFormValue] = useState('');

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
  
    try {
      const { uid, photoURL } = auth.currentUser;
      console.log("Current User: ", auth.currentUser); // Debugging line
  
      await addDoc(collection(firestore, 'messages'), {
        text: formValue,
        createdAt: serverTimestamp(),
        uid,
        photoURL
      });
  
      setFormValue('');
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };
  

  return (
    <div className="chat-room-container">
      <main className="chat-scrollable">
      {messages && [...messages].reverse().map((msg, index) => 
          <ChatMessage key={msg.id || index} message={msg} />
      )}
        <span ref={dummy}></span>
      </main>
      <form onSubmit={sendMessage} className="chat-input-form">
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type here (don't be mean anon)..."/>
        <button type="submit" disabled={!formValue}>👋</button>
      </form>
    </div>
  );
}



function ChatMessage(props) {
    const { text, uid} = props.message;
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
    const shortUid = uid ? `${uid.substring(0, 12)}` : 'Anon...';
  
    return (
      <>
        <div className={`message ${messageClass}`}>
          <span className="uid">{shortUid}:</span>
          <p>{text}</p>

        </div>
      </>
    );
  }


export default Chat;