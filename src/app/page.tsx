import Image from "next/image";
import styles from "./page.module.css";
import ConnectButton from "./components/connectButton";
import { useSignMessage } from "wagmi";
import { SignMessage } from "./components/signMessage";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h2>Wallet connect</h2>
        <ConnectButton />
      </div>

      <div className={styles.center}>
        <SignMessage />
      </div>
    </main>
  );
}
