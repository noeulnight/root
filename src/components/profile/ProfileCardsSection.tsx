import {
  BlogCard,
  GitHubCard,
  HomelabCard,
  ProfileImageCard,
  ProjectsCard,
  SpotifyCard,
  WakatimeCard,
} from "./cards";

export function ProfileCardsSection() {
  return (
    <div className="grid auto-rows-auto gap-2 sm:grid-cols-12">
      <ProfileImageCard order={0} />
      <SpotifyCard order={1} />
      <WakatimeCard order={2} />
      <GitHubCard order={3} />
      <ProjectsCard order={4} />
      <HomelabCard order={5} />
      <BlogCard order={6} />
    </div>
  );
}
