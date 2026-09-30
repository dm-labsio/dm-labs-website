import { useSEO } from "@/hooks/useSEO";
import ProcessPage from "@/components/studio/ProcessPage";

export default function Process() {
  useSEO({
    title: "Our Process | How We Build Websites | DM-Labs.io",
    description: "From a free discovery call to launch and ongoing care. Explore our five-step website design process with a schedule agreed around your project.",
  });
  return <ProcessPage locale="en" />;
}
