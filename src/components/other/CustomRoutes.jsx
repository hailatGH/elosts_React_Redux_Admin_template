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
  Hosts,
  Podcasts,
  Seasons,
  Radio,
  Stations,
  Playlists,
  Users,
  Settings,
  Profile,
  Help,
  Logout,
  Error,
  CustomCalendar,
  Category,
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
        <Route path="categories" element={<Category />} />
        <Route path="hosts" element={<Hosts />} />
        <Route path="podcasts" element={<Podcasts />} />
        <Route path="seasons" element={<Seasons />} />
      </Route>

      <Route path="/radio">
        <Route index element={<Radio />} />
        <Route path="stations" element={<Stations />} />
      </Route>

      <Route path="/playlists" element={<Playlists />} />
      <Route path="/calendar" element={<CustomCalendar />} />
      <Route path="/users" element={<Users />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/help" element={<Help />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/*" element={<Error />} />
    </Routes>
  );
}
