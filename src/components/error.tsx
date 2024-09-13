import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type props = {
  show: boolean;
  message: string;
  dismissError: VoidFunction;
};

function Error({ show, message, dismissError }: props) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={dismissError}
          className="max-w-96 bg-red-500 rounded-xl text-white text-center text-lg p-2 fixed left-0 right-0 top-4 mx-auto cursor-pointer select-none"
        >
          <p>{message}</p>
          <p className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex justify-center items-center transition-[300ms] rounded-full hover:bg-red-800">
            <FontAwesomeIcon icon={faXmark} />
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Error;
