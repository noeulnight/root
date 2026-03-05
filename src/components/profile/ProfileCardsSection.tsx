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
import { TunnelCard } from "./cards/TunnelCard";

export function ProfileCardsSection() {

  const cards = [
    ProfileImageCard,
    GitHubCard,
    AwardsCard,
    CertificationsCard,
    BlogCard,
    ProjectsCard,
    SkillsCard,
    WakatimeCard,
    SpotifyCard,
    HomelabCard,
    CalendarCard,
    TunnelCard,
  ];

  return (
    <div className="grid auto-rows-auto gap-2 sm:grid-cols-12">
      {
        cards.map((Card, index) => (
          <Card key={index} order={index} />
        ))
      }
    </div>
  );
}
