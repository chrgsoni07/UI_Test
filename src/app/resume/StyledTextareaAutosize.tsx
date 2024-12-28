import styled from "@emotion/styled";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const StyledTextareaAutosize = styled(TextareaAutosize, {
  shouldForwardProp: (prop) => prop !== "customColor",
})<{
  customColor?: string;
}>`
  color: ${(props) => props.customColor};
  width: 97%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 2px;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.4375em;
`;

export default StyledTextareaAutosize;
