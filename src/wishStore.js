import { collection, doc, setDoc, onSnapshot, query, limit, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase.js";

// Wishes are saved in Firestore (shared by every guest) when src/firebase.js exports a
// real `db`. Without one they fall back to this browser's localStorage (dev only).
const KEY = "wedding-wishes-v1";
const subs = new Set();

const readLocal = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
};

// Generate the id up front so the UI knows which lantern is the guest's own.
export function newWishId() {
  return db ? doc(collection(db, "wishes")).id : String(Date.now());
}

export function watchWishes(cb, onError) {
  if (db) {
    // No orderBy: Firestore silently skips documents that lack the ordered field
    // (for example a test document added by hand in the console). Sort on the client instead.
    const q = query(collection(db, "wishes"), limit(100));
    const ms = (w) => w.at?.toMillis?.() ?? (typeof w.at === "number" ? w.at : 0);
    return onSnapshot(
      q,
      (s) => {
        const list = s.docs
          .map((d) => ({ id: d.id, ...d.data({ serverTimestamps: "estimate" }) }))
          .sort((a, b) => ms(b) - ms(a));
        cb(list);
      },
      (err) => {
        console.error("Wishes read failed:", err.code, err.message);
        onError?.(err);
        cb(readLocal());
      }
    );
  }
  subs.add(cb);
  cb(readLocal());
  return () => subs.delete(cb);
}

export async function addWish({ id, name, text, style }) {
  const w = { name: name.trim().slice(0, 24), text: text.trim().slice(0, 140), style };
  if (db) {
    // setDoc with our own id = a "create", matching the Firestore rules.
    const write = setDoc(doc(db, "wishes", id), { ...w, at: serverTimestamp() });
    write.catch((e) => console.error("Wish save failed:", e.code, e.message));
    // Don't hang on "Releasing…" if the network is slow; rejections (permission-denied) arrive fast.
    await Promise.race([write, new Promise((r) => setTimeout(r, 6000))]);
    return;
  }
  const all = [{ ...w, id, at: Date.now() }, ...readLocal()].slice(0, 60);
  try { localStorage.setItem(KEY, JSON.stringify(all)); } catch { /* storage full or blocked */ }
  subs.forEach((f) => f(all));
}