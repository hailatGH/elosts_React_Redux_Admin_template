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
      "https://storage.googleapis.com/kin-project-352614-kinmusic-storage/Media_Files/Artists_Profile_Images/Dawit_Tsige_Dawit_Tsige.jpg",
    name: "Dawit Tsige",
    gender: "Male",
    age: 27,
  },
  {
    key: "2",
    profileImage:
      "https://storage.googleapis.com/kin-project-352614-kinmusic-storage/Media_Files/Artists_Profile_Images/Dawit_Tsige_Dawit_Tsige.jpg",
    name: "Dawit Tsige",
    gender: "Male",
    age: 27,
  },
  {
    key: "3",
    profileImage:
      "https://storage.googleapis.com/kin-project-352614-kinmusic-storage/Media_Files/Artists_Profile_Images/Dawit_Tsige_Dawit_Tsige.jpg",
    name: "Dawit Tsige",
    gender: "Male",
    age: 27,
  },
  {
    key: "4",
    profileImage:
      "https://storage.googleapis.com/kin-project-352614-kinmusic-storage/Media_Files/Artists_Profile_Images/Dawit_Tsige_Dawit_Tsige.jpg",
    name: "Dawit Tsige",
    gender: "Male",
    age: 27,
  },
  {
    key: "5",
    profileImage:
      "https://storage.googleapis.com/kin-project-352614-kinmusic-storage/Media_Files/Artists_Profile_Images/Dawit_Tsige_Dawit_Tsige.jpg",
    name: "Dawit Tsige",
    gender: "Male",
    age: 27,
  },
];

export default function NewSubscriptionsTable() {
  return <Table columns={columns} dataSource={data} pagination={false} />;
}
