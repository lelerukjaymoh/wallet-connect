"use client";

import * as React from "react";
import { useSignMessage } from "wagmi";
import { recoverMessageAddress } from "viem";
import styles from "../page.module.css";

export function SignMessage() {
  const [_message, setMessage] = React.useState<string>();
  const [recoveredAddress, setRecoveredAddress] = React.useState<string>();

  const {
    data: signMessageData,
    error,
    // isLoading,
    signMessage,
    variables,
  } = useSignMessage();

  const handleChange = (e: {
    target: { value: React.SetStateAction<string | undefined> };
  }) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    signMessage({ message: _message! });
  };

  React.useEffect(() => {
    (async () => {
      if (variables?.message && signMessageData) {
        const recoveredAddress = await recoverMessageAddress({
          message: variables?.message,
          signature: signMessageData,
        });
        setRecoveredAddress(recoveredAddress);
        console.log("recovered ", recoveredAddress);
      }
    })();
  }, [signMessageData, variables?.message]);

  return (
    <form onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor="message">
        Enter a message to sign
      </label>
      <br />
      <textarea
        onChange={handleChange}
        id="message"
        name="message"
        placeholder="Enter message to sign"
      />
      <br />
      <button className={styles.button} type="submit">
        Sign
      </button>
      {signMessageData && (
        <div>
          <div>Recovered Address: {recoveredAddress!}</div>
          <div>Signature: {signMessageData}</div>
        </div>
      )}
      {error && <div>{error.message}</div>}
    </form>
  );
}
