import React from "react";
import { Carousel } from "antd";

const contentStyle = {
  height: "300px",
  width: "100%",
  color: "#fff",
  lineHeight: "300px",
  textAlign: "center",
  background: "#364d79",
};

export default function Slide() {
  return (
    <Carousel autoplay className="slide">
      <div>
        <h3 style={contentStyle}>ADS HERE</h3>
      </div>
      <div>
        <h3 style={contentStyle}>ADS HERE</h3>
      </div>
      <div>
        <h3 style={contentStyle}>ADS HERE</h3>
      </div>
      <div>
        <h3 style={contentStyle}>ADS HERE</h3>
      </div>
    </Carousel>
  );
}
