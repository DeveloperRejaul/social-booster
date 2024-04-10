import React from "react";
import Spinner from "../spinner/Spinner";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    isLoading?: boolean
}

export default function Button(props: IButton) {
    const { text, isLoading, className, type, ...buttonProps } = props;
    return (
        <button
            className={`bg-indigo400 rounded-md py-1 flex justify-center items-center h-8 ${className}`}
            type={type || "submit"}
            {...buttonProps}
        >
            {isLoading ? <Spinner /> : props.text}
        </button>
    )
}
