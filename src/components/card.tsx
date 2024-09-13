import { motion } from "framer-motion";
import Form from "./form";

const parentVariants = {
  hidden: {
    opacity: 0,
  },
  play: {
    opacity: 1,
    transition: { delay: 0.5, when: "beforeChildren", staggerChildren: 0.2 },
  },
};

function Card() {
  return (
    <motion.div
      variants={parentVariants}
      initial="hidden"
      animate="play"
      className="text-white bg-stone-600 rounded-xl min-w-96 p-4 shadow-xl"
    >
      <Form />
    </motion.div>
  );
}

export default Card;
