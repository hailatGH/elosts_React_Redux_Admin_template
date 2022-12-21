import { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  Space,
  Table,
  Rate,
  Popconfirm,
  notification,
} from "antd";
import Highlighter from "react-highlight-words";

const text = "Are you sure you want to delete this Artist?";

const data = [
  {
    key: "1",
    artist_profileImage:
      "https://storage.googleapis.com/kin-project-352614-kinmusic-storage/Media_Files/Artists_Profile_Images/Bisrat_Surafel_Bisrat_Surafel.jpg",
    artist_name: "Bisrat Surael",
    artist_status: true,
    artist_viewcount: 0,
    artist_rating: 3.5,
    artist_FUI: "gZkd8CJAxESJpJFmXRLnU0IFkhE3",
    encoder_FUI: "0Yi6yM0YmDWd55AfF0cYea2iXsc2",
    artist_description: "Ethiopian Artist Bisre",
  },
  {
    key: "2",
    artist_profileImage:
      "https://storage.googleapis.com/kin-project-352614-kinmusic-storage/Media_Files/Artists_Profile_Images/Abeba_Desalegn_abeba.jpeg",
    artist_name: "Abeba Desalegn",
    artist_status: true,
    artist_viewcount: 0,
    artist_rating: 4,
    artist_FUI: "gZkd8CJAxESJpJFmXRLnU0IFkhE3",
    encoder_FUI: "0Yi6yM0YmDWd55AfF0cYea2iXsc2",
    artist_description: "Ethiopian Artist Abeba",
  },
];

export default function ArtistTable(props) {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const openNotification = () => {
    notification.info({
      message: "Notification",
      description: "Description",
    });
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "artist_profileImage",
      key: "artist_profileImage",
      width: "7%",
      fixed: "left",
      render: (artist_profileImage) => (
        <img src={artist_profileImage} className="tabe_images" />
      ),
    },
    {
      title: "Artist Name",
      dataIndex: "artist_name",
      key: "artist_name",
      width: "20%",
      ...getColumnSearchProps("artist_name"),
      sorter: (a, b) => a.artist_name.length - b.artist_name.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Status",
      dataIndex: "artist_status",
      key: "artist_status",
      width: "7%",
      render: (artist_status) =>
        artist_status ? (
          <i className="bx bxs-check-circle"></i>
        ) : (
          <i className="bx bxs-x-circle"></i>
        ),
    },
    {
      title: "View",
      dataIndex: "artist_viewcount",
      key: "artist_viewcount",
      width: "10%",
    },
    {
      title: "Rating",
      dataIndex: "artist_rating",
      key: "artist_rating",
      width: "17%",
      render: (artist_rating) => (
        <Rate disabled allowHalf value={artist_rating} />
      ),
    },
    {
      title: "Artist ID",
      dataIndex: "artist_FUI",
      key: "artist_FUI",
      width: "30%",
    },
    {
      title: "Encoder ID",
      dataIndex: "encoder_FUI",
      key: "encoder_FUI",
      width: "30%",
    },
    {
      title: "Action",
      key: "action",
      width: "10%",
      fixed: "right",
      render: () => (
        <div className="table_action">
          <div className="action_edit">
            <i className="bx bxs-edit" onClick={props.showModal}></i>
          </div>
          <div className="action_delete">
            <Popconfirm
              placement="left"
              title={text}
              onConfirm={openNotification}
              okText="Yes"
              cancelText="No"
            >
              <i className="bx bxs-trash-alt"></i>
            </Popconfirm>
          </div>
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      size="small"
      expandable={{
        expandedRowRender: (record) => (
          <p
            style={{
              margin: 0,
            }}
          >
            {record.artist_description}
          </p>
        ),
        rowExpandable: (record) => record.name !== "Not Expandable",
      }}
      pagination={{ defaultCurrent: 1, total: 500 }}
      scroll={{
        y: 350,
        x: 1300,
      }}
    />
  );
}
