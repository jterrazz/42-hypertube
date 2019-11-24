import Link from "./Link";
import React from "react";
import { useTranslation } from 'react-i18next';

export const LinkCustom = (props, text, href) => {
  const [t] = useTranslation();
  return (
    <Link href={props.href} variant="body2">
      {t(props.text)}
    </Link>
  )
};
