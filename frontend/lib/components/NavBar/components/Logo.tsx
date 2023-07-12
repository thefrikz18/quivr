import Link from "next/link";

export const Logo = (): JSX.Element => {
  return (
    <Link href={"/"} className="flex items-center gap-4">
      {/* <Image
        className="rounded-full"
        src="https://ozaru.io/wp-content/uploads/2022/05/ozaru_blanco.png"
        alt="Ozaru Logo"
        width={48}
        height={48}
      /> */}
      <h1 className="font-bold">Ŏzaru</h1>
    </Link>
  );
};
