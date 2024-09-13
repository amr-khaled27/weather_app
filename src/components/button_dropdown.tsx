import { motion, AnimatePresence } from "framer-motion";

const childVariants = {
  hidden: {
    opacity: 0,
  },
  play: {
    opacity: 1,
  },
};

const dropDownVariants = {
  hidden: {
    opacity: 0,
    scale: 0,
    height: 0,
    marginTop: 0,
  },
  play: {
    opacity: 1,
    scale: 1,
    height: 100,
    marginTop: 16,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  out: {
    opacity: 0,
    scale: 0,
    height: 0,
    marginTop: 0,
  },
};

const dropDownOptions = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  play: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
  },
};

type props = {
  id: string;
  handleOnClick: (id: string) => void;
  isOpen: boolean;
  title: string;
  list: string[];
};

function ButtonDropdown({ id, handleOnClick, isOpen, title, list }: props) {
  return (
    <>
      <div className="*:w-full flex flex-col *:bg-stone-500 *:shadow-sm">
        <motion.button
          variants={childVariants}
          whileTap={{ scale: 0.97 }}
          onClick={() => handleOnClick(id)}
          className="p-2 text-start flex justify-between duration-300 items-center rounded-xl"
          id={id}
          type="button"
        >
          Select {title}
          <svg
            width="15"
            className={
              (isOpen ? "rotate-180 " : "") + "fill-white duration-300"
            }
            height="15"
            viewBox="0 0 20 20"
          >
            <path d="M0 7 L 20 7 L 10 16" />
          </svg>
        </motion.button>

        <AnimatePresence>
          <motion.div
            variants={dropDownVariants}
            animate={isOpen ? "play" : "hidden"}
            className="flex flex-col *:text-start *:p-2 overflow-y-auto overflow-x-hidden rounded-tl-lg rounded-bl-lg"
          >
            {list.map((item) => {
              return (
                <motion.button
                  variants={dropDownOptions}
                  type="button"
                  key={item}
                >
                  {item}
                </motion.button>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

export default ButtonDropdown;
