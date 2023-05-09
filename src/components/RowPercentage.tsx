import styled from "styled-components";

const PercentageChangeRed = styled.span`
  border-color: #ff767c;
  color: #ff767c;
  border: 1px solid #fff1e5;
  border-radius: 3px;
  padding: 0 4px;
  margin-left: 5px;
`;

const PercentageChangeGreen = styled.span`
  border-color: #9cd321;
  color: #9cd321;
  margin-left: 5px;
  border: 1px solid #fff1e5;
  border-radius: 3px;
  padding: 0 4px;
`;

type Props = {
  percentage: number;
};

export function RowPercentage({ percentage }: Props) {
  return percentage > 0 ? (
    <PercentageChangeGreen>{percentage}%</PercentageChangeGreen>
  ) : (
    <PercentageChangeRed>{percentage}%</PercentageChangeRed>
  );
}
