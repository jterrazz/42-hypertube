import React from "react";
import Link from "next/link";
import {withTranslation} from '../../utils/i18n';

export const LinkCustom = withTranslation()((props, text, href) => {
  return (
    <Link href={props.href} passHref prefetch={false}>
      <a variant="body2">{props.t(props.text)}</a>
    </Link>
  )
});
