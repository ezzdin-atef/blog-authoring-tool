import {
  Button,
  FileInput,
  Select,
  TagsInput,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";

// slug
export default function MetaDataSettings() {
  return (
    <div className="flex flex-col gap-2 p-4">
      <Title order={2}>Metadata Settings</Title>
      <TextInput
        type="text"
        name="title"
        id="title"
        label="Title"
        placeholder="Type title..."
      />

      <Textarea
        name="excerpt"
        id="excerpt"
        label="Excerpt"
        placeholder="Type excerpt..."
      ></Textarea>

      <DateInput label="Date input" placeholder="Date input" />

      <FileInput
        label="Image Cover"
        // placeholder="Click to select image cover"
      />

      <Select
        label="Category"
        placeholder="Pick one category"
        data={["React", "Angular", "Vue", "Svelte"]}
      />

      <TagsInput label="Tags" placeholder="Type tags and press enter to add" />

      <div className="flex justify-between items-center mt-5">
        <Button color="yellow" variant="light">
          Save as Draft
        </Button>
        <Button color="blue" variant="filled">
          Publish
        </Button>
      </div>
    </div>
  );
}
