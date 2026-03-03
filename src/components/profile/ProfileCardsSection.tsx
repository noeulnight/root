import {
  AwardsCard,
  BlogCard,
  CalendarCard,
  CertificationsCard,
  GitHubCard,
  HomelabCard,
  ProfileImageCard,
  ProjectsCard,
  SkillsCard,
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
      <SkillsCard order={4} />
      <ProjectsCard order={5} />
      <BlogCard order={6} />
      <AwardsCard order={7} />
      <HomelabCard order={8} />
      <CertificationsCard order={9} />
      <CalendarCard order={10} />
    </div>
  );
}
