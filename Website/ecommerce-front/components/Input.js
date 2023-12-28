import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  padding: 10px 15px; /* Increased padding for better touch area */
  margin-bottom: 15px; /* Increased margin for better separation */
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1); /* Adding a subtle shadow */
  box-sizing: border-box;
  font-family: inherit;
  font-size: 1rem; /* Adjusting font size */
  transition: border-color 0.3s ease-in-out;

  &:focus {
    outline: none;
    border-color: #007bff; /* Highlight color when focused */
  }
`;

export default function Input(props) {
  return <StyledInput {...props} />;
}
