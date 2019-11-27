import React from "react";
import Link from "next/link";
import {i18n} from '../../utils/i18n';

export const LinkCustom = (props, text, href) => {
  return (
    <Link href={props.href} passHref>
      <a variant="body2">{i18n.t(props.text)}</a>
    </Link>
  )
};
