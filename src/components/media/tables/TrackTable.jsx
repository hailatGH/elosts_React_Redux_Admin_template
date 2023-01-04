import { useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Table, Rate, Popconfirm } from "antd";
import Highlighter from "react-highlight-words";

import { deleteTrack } from "../../../pages/music/stateSlice/tracksSlice";

export default function ArtistTable(props) {
  const dispatch = useDispatch();

  const text = `Are you sure you want to delete this ${props.name}?`;
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const [requestStatus, setRequestStatus] = useState("idle");
  const [track, setTrack] = useState();

  const onDeleteTrackClicked = () => {
    try {
      setRequestStatus("pending");
      dispatch(deleteTrack(track)).unwrap();
    } catch (err) {
      console.error("Failed to delete the track", err);
    } finally {
      setRequestStatus("idle");
    }
  };

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

  const columns = [
    {
      title: "Image",
      dataIndex: "track_coverImage",
      key: "track_coverImage",
      width: "7%",
      fixed: "left",
      render: (track_coverImage) => (
        <img src={track_coverImage} className="tabe_images" />
      ),
    },
    {
      title: "Track Name",
      dataIndex: "track_name",
      key: "track_name",
      width: "20%",
      ...getColumnSearchProps("track_name"),
      sorter: (a, b) => a.track_name.length - b.track_name.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Price",
      dataIndex: "track_price",
      key: "track_price",
      width: "10%",
    },
    {
      title: "Status",
      dataIndex: "track_status",
      key: "track_status",
      width: "7%",
      render: (track_status) =>
        track_status ? (
          <i className="bx bxs-check-circle"></i>
        ) : (
          <i className="bx bxs-x-circle"></i>
        ),
    },
    {
      title: "View",
      dataIndex: "track_viewcount",
      key: "track_viewcount",
      width: "10%",
    },
    {
      title: "Rating",
      dataIndex: "track_rating",
      key: "track_rating",
      width: "17%",
      render: (track_rating) => (
        <Rate disabled allowHalf value={track_rating} />
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
      render: (data) => (
        <div className="table_action">
          <div className="action_edit">
            <i
              className="bx bxs-edit"
              onClick={() => {
                props.onSetTrackId(data.id);
                props.showModal();
              }}
            ></i>
          </div>
          <div
            className="action_delete"
            onClick={() => {
              setTrack(data);
            }}
          >
            <Popconfirm
              placement="left"
              title={text}
              onConfirm={onDeleteTrackClicked}
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
      dataSource={props.data}
      size="small"
      expandable={{
        expandedRowRender: (record) => (
          <p
            style={{
              margin: 0,
            }}
          >
            {record.track_description}
          </p>
        ),
        rowExpandable: (record) => record.name !== "Not Expandable",
      }}
      pagination={{
        size: "small",
        hideOnSinglePage: true,
        showSizeChanger: false,
        current: props.current,
        defaultCurrent: 1,
        defaultPageSize: 10,
        total: props.tracksCount,
        onChange: props.onPageNumberChange,
      }}
      scroll={{
        y: 420,
        x: 1300,
      }}
    />
  );
}
