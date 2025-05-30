"use client";

import { Content, useContent, useLocale } from "@/i18n/client";
import content from "@/i18n/content";
import { CSSProperties } from "react";
import ReactCountryFlag from "react-country-flag";

export const ClientComponent = () => {
  const { greeting, date } = useContent(content);
  const locale = useLocale();
  const flagStyle: CSSProperties = {
    width: "3rem",
    height: "3rem",
  };

  return (
    <div>
      <h3>{greeting}</h3>
      <p>{date}</p>
      <p>
        {new Intl.NumberFormat(locale, {
          style: "currency",
          currency: "EUR",
        }).format(1234567.89)}
      </p>
      <Content>
        {{
          en: <ReactCountryFlag countryCode="GB" style={flagStyle} svg />,
          it: <ReactCountryFlag countryCode="IT" style={flagStyle} svg />,
          sv: <ReactCountryFlag countryCode="SE" style={flagStyle} svg />,
        }}
      </Content>
    </div>
  );
};
