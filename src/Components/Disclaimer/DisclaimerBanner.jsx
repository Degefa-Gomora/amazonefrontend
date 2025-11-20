import styles from "./DisclaimerBanner.module.css";

export default function DisclaimerBanner() {
  return (
    <div className={styles.banner}>
      ⚠️ This is a <strong>portfolio project</strong> for educational purposes
      only. It is <strong>not affiliated with Amazone Inc.</strong>
    </div>
  );
}
