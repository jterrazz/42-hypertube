import React from "react";
import Link from "next/link";
import { useTranslation } from 'react-i18next';

export const LinkCustom = (props, text, href) => {
  const [t] = useTranslation();
  return (
    <Link href={props.href} passHref>
      <a variant="body2">{t(props.text)}</a>
    </Link>
  )
};
