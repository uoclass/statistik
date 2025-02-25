import React from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface IButtonProps {
  children?: React.ReactNode;
  props?: any;
  onClick?: any;
  type?: any;
}

const Button: React.FC<IButtonProps> = ({
  children,
  onClick,
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="
        inline-block
        border-none
        py-2
        px-6
        m-0
        no-underline
        bg-zinc-800
        text-white
        font-sans
        text-base
        font-bold
        leading-none
        cursor-pointer
        text-center
        transition-all
        duration-250
        ease-in-out
        hover:bg-zinc-600
      "
    >
      {children}
    </button>
  );
};

export default Button;
