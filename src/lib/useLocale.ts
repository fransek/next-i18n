import { useParams } from "next/navigation";

export const useLocale = () => {
    const { locale } = useParams();
    return locale;
};
