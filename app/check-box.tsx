"use client";
import { CheckIcon } from "@/app/check-icon";
import { motion } from "framer-motion";

const Blue = "#3b82f6";
const White = "#fff";

type Props = {
  complete: boolean;
  label: string;
};
export const CheckBox = ({ complete, label }: Props) => {
  const status = complete ? "complete" : "incomplete";
  return (
    <motion.div animate={status} className="relative">
      <motion.div
        variants={{
          incomplete: {
            scale: 1,
            opacity: 1,
            transition: {
              delay: 0,
              duration: 0.2,
            },
          },
          complete: {
            scale: 1.25,
            opacity: 0,
          },
        }}
        transition={{
          duration: 0.6,
          delay: 0.2,
          type: "tween",
          ease: "circOut",
        }}
        className="absolute inset-0 rounded-full bg-blue-200"
      />
      <motion.div
        initial={false}
        variants={{
          complete: {
            backgroundColor: Blue,
            borderColor: White,
            color: White,
          },
          incomplete: {
            backgroundColor: White,
            borderColor: Blue,
            color: Blue,
          },
        }}
        transition={{ duration: 0.2 }}
        className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold`}
      >
        <div className="flex items-center justify-center">
          {complete ? <CheckIcon /> : <span>{label}</span>}
        </div>
      </motion.div>
    </motion.div>
  );
};
