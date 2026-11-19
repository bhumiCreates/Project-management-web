import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
export default function Home() {
  return(

    <div>

      <Button variant={"primary"} size={'lg'}>
        Click me
      </Button>

      <Input />
 
      <Button variant={"destructive"} size={'xs'}>
        destructive
      </Button>

      <Button variant={"outline"} size={'sm'}>
        outline
      </Button>

      <Button variant={"secondary"}>
        secondary
      </Button>

      <Button variant={"ghost"}>
        ghost
      </Button>

      <Button variant={"muted"}>
        muted
      </Button>
      <Button variant={"teritary"}>
        teritary
      </Button>

    </div>
  );
}
