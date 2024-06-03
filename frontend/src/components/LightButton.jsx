/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";

export const LightButtonXlg = ({ label = "Label", state, type, icon, className }) => {
  return (
    <div
      className={`inline-flex items-center gap-3 h-[60px] overflow-hidden rounded-3xl relative ${
        icon === "false" ? "px-9 py-3" : "pl-6 pr-9 py-3"
      } ${
        type === "gray" && state === "enabled"
          ? "bg-colors-near-neutral-50"
          : type === "f-illed" && state === "enabled"
          ? "bg-colors-primary-500"
          : type === "tinted" && state === "enabled"
          ? "bg-primary400-t"
          : type === "gray" && state === "pressed"
          ? "bg-colors-near-neutral-150"
          : type === "f-illed" && state === "pressed"
          ? "bg-colors-primary-600"
          : type === "tinted" && state === "pressed"
          ? "bg-primary500-t"
          : type === "plain" && state === "pressed"
          ? "bg-primary300-t"
          : ""
      } ${className}`}
    >
      {icon === "on" && (
        <img
          className="w-[25.5px] ml-[-0.75px] h-[25.5px] relative"
          alt="Icon settings"
          src={
            type === "gray"
              ? "https://c.animaapp.com/tXXifXJm/img/---icon--settings--12@2x.png"
              : type === "f-illed"
              ? "https://c.animaapp.com/tXXifXJm/img/---icon--settings--13@2x.png"
              : "https://c.animaapp.com/tXXifXJm/img/---icon--settings--15@2x.png"
          }
        />
      )}

      <div
        className={`font-label-extralarge-m w-fit mt-[-1.00px] tracking-[var(--label-extralarge-m-letter-spacing)] text-[length:var(--label-extralarge-m-font-size)] [font-style:var(--label-extralarge-m-font-style)] relative font-[number:var(--label-extralarge-m-font-weight)] text-center whitespace-nowrap leading-[var(--label-extralarge-m-line-height)] ${
          type === "gray" ? "text-baseblack" : type === "f-illed" ? "text-basewhite" : "text-colors-primary-500"
        }`}
      >
        {label}
      </div>
    </div>
  );
};
