// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, doc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDe0U2cocfjEPh7jOYXvfK3FE-aGRcLykA",
  authDomain: "daw-compmusic-2022.firebaseapp.com",
  projectId: "daw-compmusic-2022",
  storageBucket: "daw-compmusic-2022.appspot.com",
  messagingSenderId: "176901734090",
  appId: "1:176901734090:web:10a622ede20c0f06a5be33",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// export async function fetchActiveTiles() {
//   const response = await getDoc(doc(db, "active", "active"));
//   const activeTiles1D = response.data() as boolean[];

//   // convert activeTiles from 1D to 16x13 2D array
//   const activeTiles: boolean[][] = [];
//   for (let i = 0; i < 16; i++) {
//     activeTiles.push([]);
//     for (let j = 0; j < 13; j++) {
//       activeTiles[i].push(activeTiles1D.active[i * 13 + j]);
//     }
//   }

//   return activeTiles;
// }

export async function uploadActiveTiles(activeTiles: boolean[][]) {
  if (!activeTiles) return;

  // convert nested array to 1D array
  const activeTiles1D = activeTiles.flat();

  const activeRef = await doc(db, "active", "active");
  await setDoc(activeRef, { active: activeTiles1D });
}
