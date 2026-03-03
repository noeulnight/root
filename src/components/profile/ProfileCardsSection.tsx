import {
  AwardsCard,
  BlogCard,
  CalendarCard,
  CertificationsCard,
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
      <AwardsCard order={5} />
      <HomelabCard order={6} />
      <CertificationsCard order={7} />
      <CalendarCard order={8} />
      <BlogCard order={9} />
    </div>
  );
}
