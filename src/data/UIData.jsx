import { Rate } from "antd";

export const UIData = [
  {
    key: 1,
    link_name: "Dashboard",
    link_icon: <i className="bx bxs-grid-alt"></i>,
    link_route: "/",
    has_subMenu: false,
    link_arrow_icon: "",
    subMenu: [],
  },
  {
    key: 2,
    link_name: "Analytics",
    link_icon: <i className="bx bxs-bar-chart-alt-2"></i>,
    link_route: "/analytics",
    has_subMenu: false,
    link_arrow_icon: "",
    subMenu: [],
  },
  {
    key: 3,
    link_name: "Music",
    link_icon: <i className="bx bxs-music"></i>,
    link_route: "/music",
    has_subMenu: true,
    subMenu: [
      {
        key: 31,
        subMenu_link_name: "Artists",
        subMenu_link_route: "/music/artists",
      },
      {
        key: 32,
        subMenu_link_name: "Albums",
        subMenu_link_route: "/music/albums",
      },
      {
        key: 33,
        subMenu_link_name: "Genres",
        subMenu_link_route: "/music/geners",
      },
      {
        key: 34,
        subMenu_link_name: "Tracks",
        subMenu_link_route: "/music/tracks",
      },
    ],
  },
  {
    key: 4,
    link_name: "Podcast",
    link_icon: <i className="bx bxs-microphone-alt"></i>,
    link_route: "/podcast",
    has_subMenu: true,
    subMenu: [
      {
        key: 41,
        subMenu_link_name: "Hosts",
        subMenu_link_route: "/podcast/podcastHosts",
      },
      {
        key: 42,
        subMenu_link_name: "Podcasts",
        subMenu_link_route: "/podcast/podcasts",
      },
      {
        key: 43,
        subMenu_link_name: "Seasons",
        subMenu_link_route: "/podcast/seasons",
      },
      {
        key: 44,
        subMenu_link_name: "Episodes",
        subMenu_link_route: "/podcast/episodes",
      },
    ],
  },
  {
    key: 5,
    link_name: "Radio",
    link_icon: <i className="bx bxs-radio"></i>,
    link_route: "/radio",
    has_subMenu: true,
    subMenu: [
      {
        key: 51,
        subMenu_link_name: "Hosts",
        subMenu_link_route: "/radio/radioHosts",
      },
      {
        key: 52,
        subMenu_link_name: "Stations",
        subMenu_link_route: "/radio/stations",
      },
    ],
  },
  {
    key: 6,
    link_name: "PlayLists",
    link_icon: <i className="bx bxs-playlist"></i>,
    link_route: "/playlists",
    has_subMenu: false,
    link_arrow_icon: "",
    subMenu: [],
  },
  {
    key: 7,
    link_name: "Users",
    link_icon: <i className="bx bxs-user"></i>,
    link_route: "/users",
    has_subMenu: false,
    link_arrow_icon: "",
    subMenu: [],
  },
  {
    key: 8,
    link_name: "Settings",
    link_icon: <i className="bx bx-cog"></i>,
    link_route: "/settings",
    has_subMenu: false,
    link_arrow_icon: "",
    subMenu: [],
  },
];

// Artist Dashboard

export const artistSummeryColumns = [
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
  },
  {
    title: "Artist Name",
    dataIndex: "artistname",
    key: "artistname",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "View Count",
    dataIndex: "viewcount",
    key: "viewcount",
  },
  {
    title: "Rating",
    key: "rating",
    dataIndex: "rating",
  },
];

export const artistSummeryData = [
  {
    key: "1",
    image: (
      <img
        classname=""
        src="bisrat.jpg"
        style={{ width: "50px", borderRadius: "50%" }}
      />
    ),
    artistname: "Bisrat Surafel",
    status: <i class="bx bxs-x-circle"></i>,
    viewcount: "13654876",
    rating: <Rate allowHalf defaultValue={0} value={2.5} disabled />,
  },
  {
    key: "2",
    image: (
      <img
        classname=""
        src="dawit.jpeg"
        style={{ width: "50px", borderRadius: "50%" }}
      />
    ),
    artistname: "Dawit Tsige",
    status: <i className="bx bxs-check-circle"></i>,
    viewcount: "13654876",
    rating: <Rate allowHalf defaultValue={0} value={4.5} disabled />,
  },
  {
    key: "3",
    image: (
      <img
        classname=""
        src="esubalew.jpg"
        style={{ width: "50px", borderRadius: "50%" }}
      />
    ),
    artistname: "Esubalew Yitayew",
    status: <i className="bx bxs-check-circle"></i>,
    viewcount: "13654876",
    rating: <Rate allowHalf defaultValue={0} value={3} disabled />,
  },
  {
    key: "4",
    image: (
      <img
        classname=""
        src="lijmimic.jpeg"
        style={{ width: "50px", borderRadius: "50%" }}
      />
    ),
    artistname: "Lij Michael",
    status: <i className="bx bxs-check-circle"></i>,
    viewcount: "13654876",
    rating: <Rate allowHalf defaultValue={0} value={2.7} disabled />,
  },
];

// Album Dashboard

export const albumSummeryColumns = [
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
  },
  {
    title: "Album Name",
    dataIndex: "albumname",
    key: "albumname",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "View Count",
    dataIndex: "viewcount",
    key: "viewcount",
  },
  {
    title: "Rating",
    key: "rating",
    dataIndex: "rating",
  },
];

export const albumSummeryData = [
  {
    key: "1",
    image: (
      <img
        classname=""
        src="atgebamalugn.jpeg"
        style={{ width: "50px", borderRadius: "50%" }}
      />
    ),
    albumname: "Ategebam Alugn",
    status: <i class="bx bxs-check-circle"></i>,
    viewcount: "2071",
    rating: <Rate allowHalf defaultValue={0} value={3} disabled />,
  },
  {
    key: "2",
    image: (
      <img
        classname=""
        src="kalbekal.jpeg"
        style={{ width: "50px", borderRadius: "50%" }}
      />
    ),
    albumname: "Kal Bekal",
    status: <i className="bx bxs-x-circle"></i>,
    viewcount: "2071",
    rating: <Rate allowHalf defaultValue={0} value={1.5} disabled />,
  },
  {
    key: "3",
    image: (
      <img
        classname=""
        src="tiritaye.jpg"
        style={{ width: "50px", borderRadius: "50%" }}
      />
    ),
    albumname: "Tiritaye",
    status: <i className="bx bxs-check-circle"></i>,
    viewcount: "2071",
    rating: <Rate allowHalf defaultValue={0} value={4} disabled />,
  },
  {
    key: "4",
    image: (
      <img
        classname=""
        src="yenezema.jpeg"
        style={{ width: "50px", borderRadius: "50%" }}
      />
    ),
    albumname: "Yene Zema",
    status: <i className="bx bxs-check-circle"></i>,
    viewcount: "2071",
    rating: <Rate allowHalf defaultValue={0} value={4.5} disabled />,
  },
  {
    key: "5",
    image: (
      <img
        classname=""
        src="zareyihunnege.jpeg"
        style={{ width: "50px", borderRadius: "50%" }}
      />
    ),
    albumname: "Zare Yihun Nege",
    status: <i className="bx bxs-check-circle"></i>,
    viewcount: "2071",
    rating: <Rate allowHalf defaultValue={0} value={1} disabled />,
  },
];

// Track Dashboard

export const trackSummeryColumns = [
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
  },
  {
    title: "Track Name",
    dataIndex: "trackname",
    key: "trackname",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "View Count",
    dataIndex: "viewcount",
    key: "viewcount",
  },
  {
    title: "Rating",
    key: "rating",
    dataIndex: "rating",
  },
];

export const trackSummeryData = [
  {
    key: "1",
    image: (
      <img
        classname=""
        src="yenezema.jpeg"
        style={{ width: "50px", borderRadius: "50%" }}
      />
    ),
    trackname: "Des Alegn",
    status: <i class="bx bxs-check-circle"></i>,
    viewcount: "20718",
    rating: <Rate allowHalf defaultValue={0} value={2.5} disabled />,
  },
  {
    key: "2",
    image: (
      <img
        classname=""
        src="zareyihunnege.jpeg"
        style={{ width: "50px", borderRadius: "50%" }}
      />
    ),
    trackname: "Zemenay Mariye",
    status: <i className="bx bxs-check-circle"></i>,
    viewcount: "18925",
    rating: <Rate allowHalf defaultValue={0} value={4.5} disabled />,
  },
  {
    key: "3",
    image: (
      <img
        classname=""
        src="atgebamalugn.jpeg"
        style={{ width: "50px", borderRadius: "50%" }}
      />
    ),
    trackname: "Naniye",
    status: <i className="bx bxs-check-circle"></i>,
    viewcount: "12967",
    rating: <Rate allowHalf defaultValue={0} value={2} disabled />,
  },
  {
    key: "4",
    image: (
      <img
        classname=""
        src="tiritaye.jpg"
        style={{ width: "50px", borderRadius: "50%" }}
      />
    ),
    trackname: "Endewoyin",
    status: <i className="bx bxs-check-circle"></i>,
    viewcount: "8967",
    rating: <Rate allowHalf defaultValue={0} value={3.5} disabled />,
  },
  {
    key: "5",
    image: (
      <img
        classname=""
        src="kalbekal.jpeg"
        style={{ width: "50px", borderRadius: "50%" }}
      />
    ),
    trackname: "Godanaw",
    status: <i className="bx bxs-check-circle"></i>,
    viewcount: "1256",
    rating: <Rate allowHalf defaultValue={0} value={4.5} disabled />,
  },
];
