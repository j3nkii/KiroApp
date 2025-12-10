import Image from "next/image";
import axios from "axios";

export default async function Home() {
  const res: any = await axios.get('http://localhost:3000');
  console.log(res.data);
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {res.data}
    </div>
  );
}
