import styled from "styled-components";
import { StudentProps } from "./types";

const Card = styled.div`
  background: #f9f9f9;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  text-align: center;
  font-family: Arial, sans-serif;
`;

const Name = styled.h3`
  font-size: 20px;
  color: #333;
  margin-bottom: 5px;
`;

const Info = styled.p`
  font-size: 14px;
  color: #666;
`;

const StudentItem = ({ data }: StudentProps) => {
  const { name, surname, age, phone, email, group } = data;

  return (
    <>
      <Card>
        <Name>
          {name} {surname}
        </Name>
        <Info>Amžius: {age}</Info>
        <Info>Telefonas: {phone}</Info>
        <Info>El. paštas: {email}</Info>
        <Info>Grupė: {group ? group.name : "Nėra priskirtos grupės"}</Info>
      </Card>
    </>
  );
};

export default StudentItem;
