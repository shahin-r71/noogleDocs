import { Button } from "@/components/ui/button"


export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
       <Button className="font-mono bg-blue-500 text-white">Button</Button>
       <h1 className="font-mono">This is a test paragraph. the perporse of this paragraph is to test the button</h1>
    </div>
  );
}
