import * as Toolbar from "@radix-ui/react-toolbar";
import {
  StrikethroughIcon,
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  FontBoldIcon,
  FontItalicIcon,
} from "@radix-ui/react-icons";

const ToolbarWithTextArea = ({ value, onChange }) => (
  <div className="toolbar-textarea-wrapper">
    <Toolbar.Root
      className="flex p-[10px] w-full min-w-max rounded-md bg-white border"
      aria-label="Formatting options"
    >
      <Toolbar.ToggleGroup type="multiple" aria-label="Text formatting">
        <Toolbar.ToggleItem
          className="flex-shrink-0 flex-grow-0 basis-auto text-mauve11 h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center bg-white ml-0.5 outline-none hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
          value="bold"
          aria-label="Bold"
        >
          <FontBoldIcon />
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className="flex-shrink-0 flex-grow-0 basis-auto text-mauve11 h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center bg-white ml-0.5 outline-none hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
          value="italic"
          aria-label="Italic"
        >
          <FontItalicIcon />
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className="flex-shrink-0 flex-grow-0 basis-auto text-mauve11 h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center bg-white ml-0.5 outline-none hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
          value="strikethrough"
          aria-label="Strike through"
        >
          <StrikethroughIcon />
        </Toolbar.ToggleItem>
      </Toolbar.ToggleGroup>
      <Toolbar.Separator className="w-[1px] bg-mauve6 mx-[10px]" />
      <Toolbar.ToggleGroup
        type="single"
        defaultValue="center"
        aria-label="Text alignment"
      >
        <Toolbar.ToggleItem
          className="flex-shrink-0 flex-grow-0 basis-auto text-mauve11 h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center bg-white ml-0.5 outline-none hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
          value="left"
          aria-label="Left aligned"
        >
          <TextAlignLeftIcon />
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className="flex-shrink-0 flex-grow-0 basis-auto text-mauve11 h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center bg-white ml-0.5 outline-none hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
          value="center"
          aria-label="Center aligned"
        >
          <TextAlignCenterIcon />
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className="flex-shrink-0 flex-grow-0 basis-auto text-mauve11 h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center bg-white ml-0.5 outline-none hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
          value="right"
          aria-label="Right aligned"
        >
          <TextAlignRightIcon />
        </Toolbar.ToggleItem>
      </Toolbar.ToggleGroup>
      <Toolbar.Separator className="w-[1px] bg-mauve6 mx-[10px]" />

      <Toolbar.Button
        className="px-[10px] bg-violet9 flex-shrink-0 flex-grow-0 basis-auto h-[25px] rounded inline-flex text-[13px] leading-none items-center justify-center outline-none hover:bg-violet10 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7"
        style={{ marginLeft: "auto" }}
      >
        Share
      </Toolbar.Button>
    </Toolbar.Root>
    <textarea
      className="mt-2 input-primary"
      value={value}
      onChange={onChange}
      placeholder="Write down your bio"
      rows={3}
    />
  </div>
);

export default ToolbarWithTextArea;
