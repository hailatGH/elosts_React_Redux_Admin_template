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

const data = [
  {
    key: "1",
    genre_coverImage:
      "https://storage.googleapis.com/kin-project-352614-kinmusic-storage/Media_Files/Genres_Cover_Images/Reggae_reggae.png",
    genre_name: "Reggae",
    genre_status: true,
    genre_viewcount: 0,
    genre_rating: 3.5,
    encoder_FUI: "0Yi6yM0YmDWd55AfF0cYea2iXsc2",
    genre_description: "Ethiopian Artist Bisre",
  },
];

export default function ArtistTable(props) {
  const text = `Are you sure you want to delete this ${props.name}?`;

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
      dataIndex: "genre_coverImage",
      key: "genre_coverImage",
      width: "7%",
      fixed: "left",
      render: (genre_coverImage) => (
        <img src={genre_coverImage} className="tabe_images" />
      ),
    },
    {
      title: "Genre Name",
      dataIndex: "genre_name",
      key: "genre_name",
      width: "20%",
      ...getColumnSearchProps("genre_name"),
      sorter: (a, b) => a.genre_name.length - b.genre_name.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Status",
      dataIndex: "genre_status",
      key: "genre_status",
      width: "7%",
      render: (genre_status) =>
        genre_status ? (
          <i className="bx bxs-check-circle"></i>
        ) : (
          <i className="bx bxs-x-circle"></i>
        ),
    },
    {
      title: "View",
      dataIndex: "genre_viewcount",
      key: "genre_viewcount",
      width: "10%",
    },
    {
      title: "Rating",
      dataIndex: "genre_rating",
      key: "genre_rating",
      width: "17%",
      render: (genre_rating) => (
        <Rate disabled allowHalf value={genre_rating} />
      ),
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
            {record.genre_description}
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
