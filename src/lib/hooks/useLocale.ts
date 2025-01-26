import { useParams } from "next/navigation";

export const useLocale = <T extends string>() => {
  const { locale } = useParams();
  return locale as T;
};
