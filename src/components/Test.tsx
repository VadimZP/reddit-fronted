import { useRequestSignIn } from "@/hooks/reactQuery";

export default function Test () {
  const kek = useRequestSignIn();

  return <h1>Test</h1>
}