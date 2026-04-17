import { Button } from "@/shared/components/ui/button";
import { ButtonGroup } from "@/shared/components/ui/button-group";
import { Field } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";

interface SearchInputProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
  handleClick: () => Promise<void>;
}

const SearchInput = ({ inputRef, handleClick }: SearchInputProps) => {
  return (
    <Field className="mb-4">
      <ButtonGroup>
        <Input
          id="input-button-group"
          placeholder="Search your friend..."
          ref={inputRef}
        />
        <Button variant="outline" onClick={handleClick}>
          Search
        </Button>
      </ButtonGroup>
    </Field>
  );
};

export default SearchInput;
