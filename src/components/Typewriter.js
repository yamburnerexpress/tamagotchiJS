import { useTypewriter } from "../hooks/useTypewriter";

export const Typewriter = ({ text, speed }) => {
    const displayText = useTypewriter(text, speed);
  
    return <li>{displayText}</li>;
};