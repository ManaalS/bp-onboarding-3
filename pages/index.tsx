import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import firebase from "../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import React from "react";
import Auth from "../components/Auth";

type VoteDocument = {
  vote: string;
};

export default function Home() {
  // Firestore
  const db = firebase.firestore();

  // User Authentication
  const [user, loading, error] = useAuthState(firebase.auth());

  // Votes Collection
  const [votes, votesLoading, votesError] = useCollection(
    firebase.firestore().collection("votes"),
    {}
  );
  const addVoteDocument = async (vote: string) => {
    await db.collection("votes").doc(user.uid).set({
      vote,
    });
  };


  if (!votesLoading && votes) {
    votes.docs.map((doc) => console.log(doc.data()));
  }

  // Create document function

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gridGap: 8,
        background:
          "linear-gradient(180deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
      }}
    >
      <h1>Pineapple on Pizza?</h1>

      <div style={{ flexDirection: "row", display: "flex" }}>
        <button
          style={{ fontSize: 32, marginRight: 8 }}
          onClick={() => addVoteDocument("yes")}
        >
          ✔️🍍🍕
        </button>
        <h3>
          Pineapple Lovers:{" "}
          {
            votes?.docs?.filter(
              (doc) => (doc.data() as VoteDocument).vote === "yes"
              ).length
          }
        </h3>
      </div>
      <div style={{ flexDirection: "row", display: "flex" }}>
        <button
          style={{ fontSize: 32, marginRight: 8 }}
          onClick={() => addVoteDocument("no")}
        >
          ❌🍍🍕
        </button>
        <h3>
          Pineapple Haters:{" "}
          {
            votes?.docs?.filter(
              (doc) => (doc.data() as VoteDocument).vote === "no"
              ).length
          }
        </h3>
      </div>
    </div>
  );
}
