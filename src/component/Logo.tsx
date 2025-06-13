import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function Logo() {
  const {theme} = useTheme()
  console.log(theme)
  return (
    <Link  href="/">
      {theme === "dark" ?  <Image width={93} height={28} src="/darklogo.svg" alt="revtax logo" />: 
      <Image width={93} height={28} src="/RevtaxLogo.svg" alt="revtax logo" />}
    </Link>
  );
}
