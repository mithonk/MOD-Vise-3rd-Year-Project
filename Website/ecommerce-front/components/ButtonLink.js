import Link from "next/link";
import styled from "styled-components";
import { ButtonStyle } from "@/components/Button";
import { primary } from "@/lib/colors";
const StyledLink = styled(Link)`
  ${ButtonStyle};
  ${(props) =>
    props.main
      ? `
      background-color: #f90;
      color: white;
    `
      : `
      background-color: #f90;
      border: 1px solid ${primary};
      color: ${primary};
    `}
  &:hover {
    /* Add hover styles here */
    background-color: #f90; /* Change color on hover */
    color: black;
    border: 1px solid #f90;
  }
  ${(props) =>
    props.white &&
    `
      background-color: #f90;
      border: 1px solid white;
      font-weight: 500;
    `}
`;

export default function ButtonLink(props) {
  return <StyledLink {...props} />;
}
