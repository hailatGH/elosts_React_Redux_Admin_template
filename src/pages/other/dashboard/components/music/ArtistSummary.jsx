import { Table, Rate } from "antd";

const columns = [
  {
    title: "IMG",
    dataIndex: "profileImage",
    key: "profileImage",
    render: (profileImage) => <img src={profileImage} className="user_img" />,
  },
  {
    title: "Artist Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Rating",
    dataIndex: "rating",
    key: "rating",
    render: (rating) => <Rate disabled allowHalf defaultValue={rating} />,
  },
  {
    title: "View Count",
    key: "viewcount",
    dataIndex: "viewcount",
  },
];

const data = [
  {
    key: "1",
    profileImage:
      "https://storage.googleapis.com/kin-project-352614-kinmusic-storage/Media_Files/Artists_Profile_Images/Abeba_Desalegn_abeba.jpeg",
    name: "Abeba Desalegn",
    gender: "Female",
    rating: 2.5,
    viewcount: 32,
  },
  {
    key: "2",
    profileImage:
      "https://storage.googleapis.com/kin-project-352614-kinmusic-storage/Media_Files/Artists_Profile_Images/Abeba_Desalegn_abeba.jpeg",
    name: "Hailemichael Atrsaw",
    gender: "Female",
    rating: 2.5,
    viewcount: 32,
  },
  {
    key: "3",
    profileImage:
      "https://storage.googleapis.com/kin-project-352614-kinmusic-storage/Media_Files/Artists_Profile_Images/Abeba_Desalegn_abeba.jpeg",
    name: "Abeba Desalegn",
    gender: "Female",
    rating: 2.5,
    viewcount: 32,
  },
  {
    key: "4",
    profileImage:
      "https://storage.googleapis.com/kin-project-352614-kinmusic-storage/Media_Files/Artists_Profile_Images/Abeba_Desalegn_abeba.jpeg",
    name: "Abeba Desalegn",
    gender: "Female",
    rating: 2.5,
    viewcount: 32,
  },
  {
    key: "5",
    profileImage:
      "https://storage.googleapis.com/kin-project-352614-kinmusic-storage/Media_Files/Artists_Profile_Images/Abeba_Desalegn_abeba.jpeg",
    name: "Abeba Desalegn",
    gender: "Female",
    rating: 2.5,
    viewcount: 32,
  },
];

export default function ArtistSummary() {
  return <Table columns={columns} dataSource={data} pagination={false} />;
}
