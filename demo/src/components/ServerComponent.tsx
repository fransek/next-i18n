import { Content } from "@/i18n/client";
import content from "@/i18n/content";
import { getContent, getLocale } from "@/i18n/server";
import { CSSProperties } from "react";
import ReactCountryFlag from "react-country-flag";

export const ServerComponent = async () => {
  const { greeting, date } = await getContent(content);
  const locale = await getLocale();
  const flagStyle: CSSProperties = {
    width: "3rem",
    height: "3rem",
  };

  return (
    <div>
      <h2 className="font-bold">Server</h2>
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
          "en-US": <ReactCountryFlag countryCode="US" style={flagStyle} svg />,
          "en-GB": <ReactCountryFlag countryCode="GB" style={flagStyle} svg />,
          it: <ReactCountryFlag countryCode="IT" style={flagStyle} svg />,
          sv: <ReactCountryFlag countryCode="SE" style={flagStyle} svg />,
        }}
      </Content>
    </div>
  );
};
