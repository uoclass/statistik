import React from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface IButtonProps extends React.HTMLProps<HTMLButtonElement> {
  children?: React.ReactNode;
  props?: any;
  onClick?: any;
  type?: any;
}

const Button = ({
  children,
  onClick,
  type = "button",
  ...props
}: IButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="
        inline-flex
        gap-2
        border-none
        py-2
        px-6
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
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
