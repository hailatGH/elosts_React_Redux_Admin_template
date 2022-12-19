import { Table } from "antd";

const columns = [
  {
    title: "IMG",
    dataIndex: "profileImage",
    key: "profileImage",
    render: (profileImage) => <img src={profileImage} className="user_img" />,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "Age",
    key: "age",
    dataIndex: "age",
  },
];

const data = [
  {
    key: "1",
    profileImage:
      "https://storage.googleapis.com/kin-project-352614-kinmusic-storage/Media_Files/Artists_Profile_Images/Abeba_Desalegn_abeba.jpeg",
    name: "Abeba Desalegn",
    gender: "Female",
    age: 32,
  },
  {
    key: "2",
    profileImage:
      "https://storage.googleapis.com/kin-project-352614-kinmusic-storage/Media_Files/Artists_Profile_Images/Abeba_Desalegn_abeba.jpeg",
    name: "Hailemichael Atrsaw",
    gender: "Female",
    age: 32,
  },
  {
    key: "3",
    profileImage:
      "https://storage.googleapis.com/kin-project-352614-kinmusic-storage/Media_Files/Artists_Profile_Images/Abeba_Desalegn_abeba.jpeg",
    name: "Abeba Desalegn",
    gender: "Female",
    age: 32,
  },
  {
    key: "4",
    profileImage:
      "https://storage.googleapis.com/kin-project-352614-kinmusic-storage/Media_Files/Artists_Profile_Images/Abeba_Desalegn_abeba.jpeg",
    name: "Abeba Desalegn",
    gender: "Female",
    age: 32,
  },
  {
    key: "5",
    profileImage:
      "https://storage.googleapis.com/kin-project-352614-kinmusic-storage/Media_Files/Artists_Profile_Images/Abeba_Desalegn_abeba.jpeg",
    name: "Abeba Desalegn",
    gender: "Female",
    age: 32,
  },
];

export default function TrackSummary() {
  return <Table columns={columns} dataSource={data} pagination={false} />;
}
