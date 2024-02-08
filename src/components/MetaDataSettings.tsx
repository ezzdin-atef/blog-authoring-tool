import {
  Button,
  FileInput,
  Select,
  Switch,
  TagsInput,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useContext } from "react";
import { EditorContext } from "../Context";

// slug
export default function MetaDataSettings() {
  const { metadata, updateMetadata } = useContext(EditorContext);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <Title order={2}>Metadata Settings</Title>
        <Switch
          size="xl"
          onLabel="Published"
          offLabel="Draft"
          checked={!metadata.isDraft}
          onChange={(event) => {
            updateMetadata("isDraft", !event.currentTarget.checked);
          }}
        />
      </div>
      <TextInput
        type="text"
        name="title"
        id="title"
        label="Title"
        placeholder="Type title..."
        value={metadata.title}
        onChange={(event) => {
          updateMetadata("title", event.currentTarget.value);
        }}
      />

      <Textarea
        name="excerpt"
        id="excerpt"
        label="Excerpt"
        placeholder="Type excerpt..."
        value={metadata.excerpt}
        onChange={(event) => {
          updateMetadata("excerpt", event.currentTarget.value);
        }}
      ></Textarea>

      <DateInput
        label="Date input"
        placeholder="Date input"
        value={new Date(metadata.date)}
        onChange={(value) => {
          updateMetadata("date", new Date(value?.toString() || 0));
        }}
      />

      <FileInput
        label="Image Cover"
        // placeholder="Click to select image cover"
        // onChange={(files) => {}}
      />

      <Select
        label="Category"
        placeholder="Pick one category"
        data={["React", "Angular", "Vue", "Svelte"]}
        value={metadata.category}
        onChange={(value) => {
          updateMetadata("category", value as string);
        }}
      />

      <TagsInput
        label="Tags"
        placeholder="Type tags and press enter to add"
        value={metadata.tags}
        onChange={(value) => {
          updateMetadata("tags", value);
        }}
      />

      <div className="flex justify-end items-center mt-5">
        <Button color="blue" variant="filled">
          Save
        </Button>
      </div>
    </div>
  );
}
