import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/">
      <Image width={93} height={28} src="/RevtaxLogo.svg" alt="revtax logo" />
    </Link>
  );
}
