import React from "react";
import "../stylesheets/Slider.css";
import leftArrow from "../icons/left-arrow.svg";
import rightArrow from "../icons/right-arrow.svg";

export default function BtnSlider({ direction, moveSlide }) {
  return (
    <button
      onClick={moveSlide}
      className={direction === "next" ? "btn-slide next" : "btn-slide prev"}  //applying css for button based on button direction
    >
      <img src={direction === "next" ? rightArrow : leftArrow} />{/*displaying arrow sgv based on direction inparameter*/}
    </button>
  );
}