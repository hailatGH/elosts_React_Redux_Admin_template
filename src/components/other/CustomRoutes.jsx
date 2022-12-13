// Router Import
import { Routes, Route } from "react-router-dom";

// Pages Import
import {
  Dashboard,
  Analytics,
  Music,
  Artists,
  Albums,
  Geners,
  Tracks,
  Podcast,
  Episodes,
  PodcastHosts,
  Podcasts,
  Seasons,
  Radio,
  RadioHosts,
  Stations,
  Playlists,
  Users,
  Settings,
  Profile,
  Help,
  Logout,
  Error,
} from "../../pages";

export default function CustomRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/analytics" element={<Analytics />} />

      <Route path="/music">
        <Route index element={<Music />} />
        <Route path="albums" element={<Albums />} />
        <Route path="artists" element={<Artists />} />
        <Route path="geners" element={<Geners />} />
        <Route path="tracks" element={<Tracks />} />
      </Route>

      <Route path="/podcast">
        <Route index element={<Podcast />} />
        <Route path="episodes" element={<Episodes />} />
        <Route path="podcastHosts" element={<PodcastHosts />} />
        <Route path="podcasts" element={<Podcasts />} />
        <Route path="seasons" element={<Seasons />} />
      </Route>

      <Route path="/radio">
        <Route index element={<Radio />} />
        <Route path="radioHosts" element={<RadioHosts />} />
        <Route path="stations" element={<Stations />} />
      </Route>

      <Route path="/playlists" element={<Playlists />} />
      <Route path="/users" element={<Users />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/help" element={<Help />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/*" element={<Error />} />
    </Routes>
  );
}
