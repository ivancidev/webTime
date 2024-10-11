import React from "react";
import { toast, ToastContainer, Zoom } from "react-toastify"

export const Toast = (message="") => {
    return(
        toast.success(mesagge,{
            position: toast.POSITION.TOP_CENTER,
            ClassName: "bg-[#0E1217] text-primary-pri3",
            theme: "dark",
            transition:Zoom,
            autoClose: 2000
        })
    );
};