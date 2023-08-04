import styles from "./styles.module.css";

type IconButtonProps = {
  icon: React.ReactNode;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const IconButton = ({ icon, ...props }: IconButtonProps) => {
  return (
    <button
      className={`${styles.button__icon} ${styles.button__ripple} ${props.className}`}
      {...props}
    >
      {icon}
    </button>
  );
};
