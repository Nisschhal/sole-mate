import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

const SubmitButtons = ({ text }: { text: string }) => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled>
          <Loader2 className="mr-2 size-4 animate-spin" />
          Please Wait...
        </Button>
      ) : (
        <Button type="submit">{text}</Button>
      )}
    </>
  );
};

export default SubmitButtons;
