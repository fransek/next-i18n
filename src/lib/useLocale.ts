import { useParams } from "next/navigation";

export const useLocale = <T extends string | string[] | undefined>() => {
  const { locale } = useParams();
  return locale as T;
};
