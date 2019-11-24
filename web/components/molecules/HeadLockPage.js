import {LockOutlined} from "../atoms/LockOutlined";
import {TypographyTitle} from "../atoms/TypographyTitle";
import React from "react";

export const HeadLockPage = (props, text) => {
  return (
    <>
      <LockOutlined />
      <TypographyTitle text={props.text}/>
    </>
  )
};
